import React, { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  if (isConnected) {
    navigate("/cells");
  }

  return (
    <>
      {/* <!-- Hero --> */}
      <div class="bg-slate-900">
        <div class="bg-gradient-to-b from-violet-600/[.15] via-transparent">
          <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 min-h-screen flex items-center justify-center">
            <div className="grid gap-y-8">
              {/* <!-- Announcement Banner --> */}
              <div class="flex justify-center">
                <h1 className="text-[#6A43ED] font-extrabold text-5xl">
                  Color Hack
                </h1>
              </div>
              {/* <!-- End Announcement Banner --> */}

              {/* <!-- Title --> */}
              <div class="max-w-3xl text-center mx-auto">
                <h1 class="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Now it's easier than ever to build DAPPS
                </h1>
              </div>
              {/* <!-- End Title --> */}

              <div class="max-w-3xl text-center mx-auto">
                <p class="text-lg text-gray-400">
                  Color Hack is an open-source project, crafted with Tailwind
                  CSS framework and Hardhat development tools.
                </p>
              </div>

              {/* <!-- Buttons --> */}
              <div class="flex items-center justify-center">
                <ConnectButton />
              </div>
              {/* <!-- End Buttons --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
