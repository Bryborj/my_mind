import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

function Navbar() {
  return (
    <nav className="p-4 bg-gray-900 text-white flex items-center justify-between shadow-md" aria-label="Main navigation">
      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="hover:text-blue-400 transition-colors font-semibold flex items-center">
          <span className="mr-2">🏠</span> Dashboard
        </Link>
        <Link href="/create-habit" className="hover:text-blue-400 transition-colors font-semibold flex items-center">
          <span className="mr-2">➕</span> Nuevo hábito
        </Link>
      </div>
      <div>
        <SignedIn>
          <SignOutButton>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors font-semibold">
              Cerrar sesión
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Navbar />
      <main className="max-w-3xl mx-auto mt-8 px-4">
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </ClerkProvider>
  );
}

export default MyApp;
