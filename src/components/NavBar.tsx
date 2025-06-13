import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="p-4 bg-gray-900/80 backdrop-blur-md text-white flex items-center justify-between shadow-md rounded-b-xl border-b border-gray-800 transition-all relative z-20">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/dashboard"
          className="hover:text-blue-400 transition-colors font-semibold flex items-center text-sm sm:text-base"
        >
          <span className="mr-2">🏠</span>
          <span className="hidden xl:inline">Dashboard</span>
        </Link>

        <Link
          href="/create-habit"
          className="hover:text-blue-400 transition-colors font-semibold flex items-center text-sm sm:text-base"
        >
          <span className="mr-2">➕</span>
          <span className="hidden xl:inline">Nuevo hábito</span>
        </Link>
      </div>

      <SignedIn>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="ml-2">
            <UserButton appearance={{ elements: { avatarBox: "ring-2 ring-blue-400" } }} />
          </div>
        </div>
      </SignedIn>
    </nav>
  );
};
