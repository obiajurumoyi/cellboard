import { WagmiConfig, createConfig, configureChains, sepolia } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./landing";
import CellBoard from "./cellBoard";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [
    infuraProvider({
      apiKey: import.meta.env.VITE_INFURA_API_KEY,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "cellboard",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cells" element={<CellBoard />} />
        </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
