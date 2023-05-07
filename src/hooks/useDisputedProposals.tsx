import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractRead,
} from "wagmi";
import abi from "../abi/ArbitratorABI";
import { BigNumber } from "ethers";

enum DisputeOutcome {
  NoRule = 0,
  ProposerWins = 1,
  ChallengerWins = 2,
}

enum DisputeStatus {
  Waiting = 0,
  Appealable = 1,
  Solved = 2,
}

export const useDisputedProposals = () => {
  const { data: disputeId } = useContractRead({
    abi: abi,
    address: "0x3f7e3b130D1F75A15eB7Ee7eE1959fDbC43DA9A0",
    functionName: "disputeId",
  });

  const { data: disputes, ...rest } = useContractInfiniteReads({
    cacheKey: "disputedProposals",
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            abi,
            address: "0x3f7e3b130D1F75A15eB7Ee7eE1959fDbC43DA9A0",
            functionName: "disputes",
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      {
        start: disputeId!.toNumber() - 1 ?? 0,
        perPage: disputeId!.toNumber() > 10 ? 10 : disputeId!.toNumber(),
        direction: "decrement",
      }
    ),
    enabled: !!disputeId,
  });
  const proposals =
    disputes?.pages && disputes.pages[0]
      ? disputes.pages[0].slice(0, -1).map((proposal, index) => {
          const proposalId = disputes.pages[0].length - (index + 1);
          // console.log(proposal);
          // return [proposalId, ...proposal];
          return {
            id: proposalId,
            ruling: DisputeOutcome[proposal[3].toString()],
            status: DisputeStatus[proposal[4].toString()],
          };
        })
      : [];

  return { proposals, ...rest, disputes };
};
