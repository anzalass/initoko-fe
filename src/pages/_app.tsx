import AppShell from "@/components/appshell";
import EditAlamatContext from "@/context/alamatContext";
import OpenCartContext from "@/context/openCartContext";
import OpenKategoriContext from "@/context/openKategoriContext";
import RenderTableContext from "@/context/renderTable";
import SearchProductContext from "@/context/searchContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RenderTableContext>
        <SearchProductContext>
          <EditAlamatContext>
            <OpenKategoriContext>
              <OpenCartContext>
                <AppShell>
                  <Component {...pageProps} />
                </AppShell>
              </OpenCartContext>
            </OpenKategoriContext>
          </EditAlamatContext>
        </SearchProductContext>
      </RenderTableContext>
    </SessionProvider>
  );
}
