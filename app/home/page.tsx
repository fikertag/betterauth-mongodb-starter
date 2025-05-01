"use client";
export default function Home() {
  return (
    <main className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 relative overflow-hidden">
      {/* Main content */}
      <div className="text-center space-y-8 z-10 max-w-3xl mx-auto">
        {/* Headline with power indicator */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-sm font-medium">
            <Zap className="w-4 h-4 mr-1.5" />
            Powered by Better Auth
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Enterprise-Grade Security
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The complete authentication system with brute-force protection, rate
            limiting, and real-time security monitoring.
          </p>
        </div>

        {/* Security feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            {
              icon: (
                <ShieldCheck className="w-8 h-8 mx-auto text-blue-600 dark:text-blue-400" />
              ),
              title: "Brute-Force Protection",
              desc: "Auto-block suspicious activity",
            },
            {
              icon: (
                <LockKeyhole className="w-8 h-8 mx-auto text-purple-600 dark:text-purple-400" />
              ),
              title: "Rate Limiting",
              desc: "Prevents API abuse",
            },
            {
              icon: (
                <Users className="w-8 h-8 mx-auto text-green-600 dark:text-green-400" />
              ),
              title: "Role-Based Access",
              desc: "Granular permission control",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {item.icon}
              <h3 className="font-semibold text-gray-900 dark:text-white mt-3">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA with security reassurance */}
        <div className="mt-10 space-y-4">
          <button className="relative overflow-hidden px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="relative z-10">Get Started in 60s</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <LockKeyhole className="inline w-3 h-3 mr-1" />
            All data encrypted in transit and at rest
          </p>
        </div>
      </div>

      {/* Global styles */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

// Security-themed icons
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const LockKeyhole = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1a5 5 0 0 0-5 5v3H6v13h12V9h-1V6a5 5 0 0 0-5-5zm0 1a4 4 0 0 1 4 4v3H8V6a4 4 0 0 1 4-4zm0 10a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </svg>
);

const Server = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 1h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm0 8h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM5 19a7 7 0 0 1 14 0v1H5v-1z" />
    <path d="M8.5 9.5a5 5 0 1 1 7 0M15 19v1a7 7 0 0 0 6-7h-1a5 5 0 0 1-5 5z" />
  </svg>
);
