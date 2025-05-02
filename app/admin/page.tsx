"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  avatarColor?: string;
}

interface UsersResponse {
  data?: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string;
      role: string;
      createdAt: string | Date;
      updatedAt: string | Date;
    }>;
    total?: number;
    limit?: number;
    offset?: number;
  };
}

export default function AdminDashboard() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = session?.user?.role === "admin";

  const maskEmail = (email: string): string => {
    const [username, domain] = email.split("@");
    return `${username.substring(0, 2)}...@${domain}`;
  };

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        try {
          const response = (await authClient.admin.listUsers({
            query: { sortBy: "createdAt", sortDirection: "desc" },
          })) as UsersResponse;

          const userData =
            response.data?.users?.map((user) => ({
              ...user,
              createdAt: new Date(user.createdAt),
              updatedAt: new Date(user.updatedAt),
              avatarColor: "gray",
              role: user.role as User["role"], // Type assertion for known roles
            })) || [];

          setUsers(userData);
        } catch (err) {
          console.error("Failed to fetch users:", err);
          setError("Failed to fetch users. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isAdmin]);

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-57px)]">
        <Skeleton className="h-8 w-[200px]" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-57px)] px-4">
        <div className="max-w-[90%] sm:max-w-md w-full">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription className="break-words">
              This page is for admins only. Your role:{" "}
              {session?.user?.role || "guest"}
              <div className="mt-3 text-sm">
                Admin demo credentials:
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mt-1 font-mono text-xs">
                  <div>Email: fikeryilkaltages1@gmail.com</div>
                  <div>Password: 12345678</div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-57px)] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold ">
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-slate-600">
              Manage application users and permissions
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-slate-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">User Management</h2>
                <p className="text-sm text-slate-600">
                  {users.length} user{users.length !== 1 ? "s" : ""} registered
                </p>
              </div>
              <Badge variant="outline" className="text-xs text-slate-600">
                Updated: {new Date().toLocaleTimeString()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-800/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.image} />
                            <AvatarFallback>
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-slate-600">
                              ID: {user.id.substring(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {maskEmail(user.email)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.emailVerified ? "default" : "secondary"}
                        >
                          {user.emailVerified ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "border-purple-500/50 text-purple-400 bg-purple-900/20"
                              : "border-blue-500/50 text-blue-400 bg-blue-900/20"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {user.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
