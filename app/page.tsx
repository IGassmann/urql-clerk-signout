"use client";

import APIData from '@/app/APIData';
import { OrgDetails, SessionDetails, UserDetails } from '@/app/UserDetails';
import { SignOutButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <div className="flex flex-col gap-16">
        <div className="grid gap-4 mt-8 lg:grid-cols-3">
          <UserDetails/>
          <SessionDetails/>
          <OrgDetails/>
        </div>
        <APIData/>
        {/* This internally performs a redirect to the sign-in page with Next.js' router.push('/sign-in') function. */}
        <SignOutButton>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Sign out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
