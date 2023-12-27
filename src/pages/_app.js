import AppLayout from "src/core/layouts/App";
import "src/styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <title>Agile Awareness Survey</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionContextProvider>
  );
}
