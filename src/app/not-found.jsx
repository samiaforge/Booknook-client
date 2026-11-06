
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101714] px-4 py-10">
      <div className="w-full max-w-lg text-center">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-[#f6e262]">
          404
        </h1>

        <h2 className="mt-6 text-2xl md:text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-4 leading-7 text-gray-400">
          Oops! The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <p className="mt-2 text-gray-400">
          Don't worry, let's get you back to your bookshelf!
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-[#f6e262] px-8 py-3 font-semibold text-black transition hover:bg-[#e9d44e]"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
};

export default NotFound;
