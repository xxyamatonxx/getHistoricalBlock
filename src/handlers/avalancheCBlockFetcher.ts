import { EvmRpcClient } from "../clients/evmRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const ENDPOINT = "https://avalanche.public-rpc.com";

interface BlockAndDate {
  date: Date | null,
  blockNumber: number,
}

async function handler() {
  const client = new EvmRpcClient(ENDPOINT);

  const startBlock = 44874300; // 5月の最初の方のblock
  const endBlock = 43625900; // 3月末のblock

  try {
    const blockAndDateGroup: BlockAndDate[] = []
    for (let i = startBlock; i > endBlock; i -= 30) {
      const date = await client.getBlockByNumber(i);
      const blockAndDate: BlockAndDate = {
        date: date,
        blockNumber: i,
      };

      console.log(blockAndDate);
      if (blockAndDate.date === null) {
        continue;
      }

      if (isCloseToMidnight(blockAndDate.date)) {
        console.log("対象発見");
        console.log(blockAndDate);
        blockAndDateGroup.push(blockAndDate);
        i -= 41000;
      };
    };
    console.log(blockAndDateGroup);
    return blockAndDateGroup
  } catch (e: any) {
    console.error(e.message);
    throw new Error(e);
  }
}handler()