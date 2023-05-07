import { AragonProvider } from "@daobox/use-aragon";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { type AppType } from "next/dist/shared/lib/utils";
import React from "react";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "~/config-wagmi";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <AragonProvider>
          {mounted && <Component {...pageProps} />}
        </AragonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
