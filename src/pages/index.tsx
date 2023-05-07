import React from "react";
import { Layout } from "../components/Layout";
import { useDisputedProposals } from "~/hooks/useDisputedProposals";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "../abi/ArbitratorABI";
import { BigNumber, BigNumberish } from "ethers";

interface DisputeCardProps {
  id: number;
  status: string;
  ruling: string;
}

function DisputeCard({ id, status, ruling }: DisputeCardProps) {
  const { writeAsync: proposerWin } = useRuleDispute(id, 1);
  const { writeAsync: disputerWin } = useRuleDispute(id, 2);
  const handleProposerWin = async () => {
    const tx = await proposerWin?.();
    console.log({ tx });
  };

  const handleChallengeWin = async () => {
    const tx = await disputerWin?.();
    console.log({ tx });
  };

  // console.log({ proposerWinStatus });
  return (
    <div className="card bg-base-300 p-4 shadow-xl">
      <div className="flex justify-between pb-4">
        <h2 className="card-title">Dispute ID: {id}</h2>
        <div className="space-x-2">
          <div className="badge-outline badge">{status}</div>
          <div className="badge-outline badge">{ruling}</div>
        </div>
      </div>
      <div className="flex w-max justify-between space-x-4 p-2">
        <button className="btn" onClick={() => handleProposerWin()}>
          Proposer Win
        </button>
        <button className="btn" onClick={() => handleChallengeWin()}>
          Challanger Win
        </button>
      </div>
    </div>
  );
}

const Index = () => {
  const { disputes, proposals } = useDisputedProposals();

  console.log({ disputes });

  // console.log({ proposals });
  // console.log({ disputes });
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposals &&
            proposals.map((proposal, key) => (
              <DisputeCard key={key} {...proposal} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export const useRuleDispute = (disputeId: BigNumberish, rule: BigNumberish) => {
  const { config, fetchStatus } = usePrepareContractWrite({
    abi: abi,
    address: "0x3f7e3b130D1F75A15eB7Ee7eE1959fDbC43DA9A0",
    functionName: "giveRuling",
    args: [BigNumber.from(disputeId), BigNumber.from(rule)],
  });
  // console.log({ fetchStatus });
  return useContractWrite(config);
};

export default Index;
