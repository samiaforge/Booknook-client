"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      formData.password.length < 6
    ) {
      setError(
        "Password must contain uppercase, lowercase and at least 6 characters."
      );
      return;
    }

    setLoading(true);

    const { error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
      callbackURL: "/",
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
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) setError(error.message);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#101714] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-[#19231E] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-6 text-gray-400">
          Join the BookNook community.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {[
            { name: "name", label: "Full Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "image", label: "Photo URL", type: "url" },
            { name: "password", label: "Password", type: "password" },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-2 block text-sm text-white">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.name !== "image"}
                className="w-full rounded-lg border border-gray-600 bg-[#101714] p-3 text-white outline-none"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#f6e262] py-3 font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className="my-5 text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full rounded-lg border border-gray-500 py-3 text-white"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#f6e262]">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;