export default function Home() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-[500px] h-[400px] bg-indigo-800 rounded-full blur-3xl opacity-20 -translate-x-1/2 animate-pulse" />
      </div>

      {/* Secret Content */}
      <div className="text-center space-y-6 z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight  mb-8">
          Welcome back, Agent 👁️
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto animate-fade-in delay-100">
          You've entered the secure zone. Below are your classified secrets:
        </p>

        <ul className="text-left text-slate-400 text-base sm:text-lg font-mono space-y-2 animate-fade-in delay-200 max-w-md mx-auto">
          <li>
            🔐 Secret Code: <span className="text-white">XJ-49-AUTH-ALPHA</span>
          </li>
          <li>
            📦 Deployment Key: <span className="text-white">insta-db-42</span>
          </li>
          <li>
            👨‍💻 Debug Mode: <span className="text-green-400">ENABLED</span>
          </li>
          <li>🧠 Fun Fact: Better Auth is... better.</li>
        </ul>
      </div>
    </main>
  );
}
