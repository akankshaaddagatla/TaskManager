"use client";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-neutral-800 p-6 rounded-lg w-96 space-y-5">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center">
          Sign In
        </h1>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-neutral-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 rounded bg-neutral-700 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-neutral-600 py-2 rounded hover:bg-neutral-500 transition"
          >
            Sign In
          </button>
        </form>

        {/* Switch */}
        <p className="text-sm text-center text-neutral-400">
          Don’t have an account?
          <button
            type="button"
            className="text-white underline ml-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

