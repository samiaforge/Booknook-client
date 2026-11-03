import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#f6e262]/20 bg-[#0D1917] text-[#B8C5B5]">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">

       
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-[#f6e262]"
          >
            BookNook
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-7">
            Your little corner of books and stories.
            Discover new books, explore different categories,
            and enjoy reading with BookNook.
          </p>
        </div>

        
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#F3EFE4]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:text-[#f6e262]">
              Home
            </Link>

            <Link href="/books" className="hover:text-[#f6e262]">
              All Books
            </Link>

            <Link href="/login" className="hover:text-[#f6e262]">
              Login
            </Link>

            <Link href="/register" className="hover:text-[#f6e262]">
              Register
            </Link>
          </div>
        </div>

       
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#F3EFE4]">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm">
            <p>Email: your-email@example.com</p>
            <p>Website: BookNook Library</p>
          </div>
        </div>

       
        <div>
          <h3 className="mb-4 text-lg font-semibold text-[#F3EFE4]">
            Follow Us
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f6e262]"
            >
              Facebook
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f6e262]"
            >
              Instagram
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#f6e262]"
            >
              X
            </a>
          </div>
        </div>

      </div>

   
      <div className="border-t border-[#f6e262]/20 px-5 py-5 text-center text-xs">
        © 2026 BookNook. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;