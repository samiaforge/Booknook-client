"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from 'react';



const Navbar = ({ user = null, onLogout }) => {
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-50 border-b border-#f6e262]/20 bg-[#0D1917]">
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
              className={`text-sm transition ${
                isActive(link.path)
                  ? "font-semibold text-[#f6e262]"
                  : "text-[#B8C5B5] hover:text-[#f6e262]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm transition ${
                  isActive(link.path)
                    ? "font-semibold text-[#f6e262]"
                    : "text-[#B8C5B5] hover:text-[#f6e262]"
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm text-[#F3EFE4] transition hover:text-[#f6e262]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#f6e262] px-5 py-2 text-sm font-semibold text-[#0D1917] transition hover:bg-[#f6e262]"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
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
                <span>⌄</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-lg border border-[#f6e262]/20 bg-[#142421] p-2 shadow-xl">
                  <Link
                    href="/my-profile"
                    onClick={closeMenu}
                    className="block rounded-md px-3 py-2 text-sm text-[#F3EFE4] hover:bg-[#1D302C]"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      onLogout?.();
                      setProfileOpen(false);
                    }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-[#1D302C]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-[#f6e262] md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "×" : "☰"}
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
                className={`text-sm ${
                  isActive(link.path)
                    ? "font-semibold text-[#f6e262]"
                    : "text-[#F3EFE4]"
                }`}
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
                    className={`text-sm ${
                      isActive(link.path)
                        ? "font-semibold text-[#f6e262]"
                        : "text-[#F3EFE4]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <Link
                  href="/my-profile"
                  onClick={closeMenu}
                  className="text-sm text-[#F3EFE4]"
                >
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    onLogout?.();
                    closeMenu();
                  }}
                  className="text-left text-sm text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;