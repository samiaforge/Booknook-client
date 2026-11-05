"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "All Books", path: "/books" },
  ];

  const privateLinks = [
    { name: "Add Book", path: "/add-book" },
    { name: "My Books", path: "/my-books" },
    { name: "My Borrows", path: "/my-borrows" },
  ];

  const isActive = (path) => pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    closeMenu();
    router.push("/");
    router.refresh();
  };

  const linkClass = (path) =>
    `text-sm transition ${
      isActive(path)
        ? "font-semibold text-[#f6e262]"
        : "text-[#B8C5B5] hover:text-[#f6e262]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#f6e262]/20 bg-[#0D1917]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-wide text-[#f6e262]"
        >
          BookNook
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={linkClass(link.path)}
            >
              {link.name}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={linkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {!isPending && !user ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm text-[#F3EFE4] transition hover:text-[#f6e262]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#f6e262] px-5 py-2 text-sm font-semibold text-[#0D1917]"
              >
                Register
              </Link>
            </>
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg border border-[#f6e262]/30 px-3 py-2 text-[#F3EFE4]"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6e262] text-sm font-bold text-[#0D1917]">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}

               <span className="text-sm">{user.name}</span>
<i className="fa-solid fa-chevron-down text-xs"></i>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-lg border border-[#f6e262]/20 bg-[#142421] p-2 shadow-xl">
                  <p className="border-b border-[#f6e262]/20 px-3 py-2 text-sm text-gray-400">
                    {user.email}
                  </p>

                  <Link
                    href="/my-profile"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 text-sm text-[#F3EFE4] hover:bg-[#1D302C]"
                  >
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-[#1D302C]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
  type="button"
  onClick={() => setMenuOpen(!menuOpen)}
  className="text-2xl text-[#f6e262] md:hidden"
  aria-label="Toggle navigation menu"
>
  <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
</button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-[#f6e262]/20 bg-[#142421] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">

            {publicLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMenu}
                className={linkClass(link.path)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                {privateLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={closeMenu}
                    className={linkClass(link.path)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex items-center gap-3 border-t border-[#f6e262]/20 pt-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6e262] font-bold text-[#0D1917]">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  )}

                  <div>
                    <p className="text-sm text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/my-profile"
                  onClick={closeMenu}
                  className="text-sm text-[#F3EFE4]"
                >
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left text-sm text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              !isPending && (
                <div className="flex gap-3 border-t border-[#f6e262]/20 pt-4">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-lg border border-[#f6e262] px-5 py-2 text-sm text-[#F3EFE4]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="rounded-lg bg-[#f6e262] px-5 py-2 text-sm font-semibold text-[#0D1917]"
                  >
                    Register
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;