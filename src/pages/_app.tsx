import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import {Navbar} from '@/components/NavBar';
import { dark } from '@clerk/themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark
    }}>
      <SignedIn>
        <Navbar />
        <main className="max-w-3xl mx-auto mt-8 px-4">
          <Component {...pageProps} />
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default MyApp;
