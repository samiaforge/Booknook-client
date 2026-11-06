
import Link from "next/link";

const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#101714] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-[#19231E] p-8">
        <h1 className="mb-2 text-3xl font-bold text-white text-center">
          Forgot Password?
        </h1>

        <p className="mb-8 text-gray-400 text-center">
          Enter your email to reset your password.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white">
              Email Address
            </label>

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-600 bg-[#101714] p-3 text-white outline-none focus:border-[#f6e262]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#f6e262] py-3 font-semibold text-black hover:bg-[#e9d44e] transition"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-[#f6e262] hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
