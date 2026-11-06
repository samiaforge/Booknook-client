
"use client";

import { authClient } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#101714] text-[#f6e262]">
        Loading profile...
      </div>
    );
  }



  

  return (
    <PrivateRoute>
      <main className="min-h-screen bg-[#101714] px-4 py-16">
        <div className="mx-auto max-w-2xl">

          {/* Page Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Profile
            </h1>

            <p className="mt-3 text-gray-400">
              Manage and view your BookNook account information.
            </p>
          </div>

          {/* Profile Card */}
          <div className="rounded-2xl border border-gray-700 bg-[#19231E] p-8 md:p-10">

            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-4 border-[#f6e262] object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#f6e262] text-4xl font-bold text-black">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Full Name
                </label>

                <div className="rounded-lg border border-gray-700 bg-[#101714] p-4 text-white">
                  {user?.name || "Not available"}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email Address
                </label>

                <div className="rounded-lg border border-gray-700 bg-[#101714] p-4 text-white">
                  {user?.email || "Not available"}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Account Status
                </label>

                <div className="rounded-lg border border-gray-700 bg-[#101714] p-4 text-green-400">
                  Active Member
                </div>
              </div>

            </div>

            {/* Action */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-block rounded-lg bg-[#f6e262] px-8 py-3 font-semibold text-black transition hover:bg-[#e9d44e]"
              >
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default ProfilePage;
