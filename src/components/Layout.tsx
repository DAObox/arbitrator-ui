import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-full flex-col">
      <nav className="bg-base-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-33 h-8"
                  src="/daobox.png"
                  alt="Your Company"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4"></div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-base-200 shadow">
        <div className="mx-auto flex max-w-7xl justify-between px-4 py-6  sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            Centralised Arbitrator
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            <div className={`grid grid-cols-1 gap-4 lg:col-span-3`}>
              <div className="w-max p-2">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
