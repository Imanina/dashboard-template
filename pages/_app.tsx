import "../styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { AuthProvider } from "../lib/auth-context";
import { ApplicationProvider } from "../lib/application-store";
// import type { AppProps } from "next/app";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApplicationProvider>
    </AuthProvider>
  );
} 