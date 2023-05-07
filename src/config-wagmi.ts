import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    publicProvider(),
  ]
);

export const { connectors } = getDefaultWallets({
  appName: "Centralised Arbitrator",
  projectId: "DAOBox",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
