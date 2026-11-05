"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setError("");

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#101714] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-[#19231E] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="mb-8 text-gray-400 text-center">
          Login to continue to BookNook.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-600 bg-[#101714] p-3 text-white outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-600 bg-[#101714] p-3 text-white outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#f6e262] py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-5 text-center text-gray-400">
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-gray-500 py-3 text-white hover:bg-[#26332c]"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-[#f6e262]">
            Register
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-gray-400">
          <a href="/forgot-password" className="hover:text-white">
            Forgot Password?
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;