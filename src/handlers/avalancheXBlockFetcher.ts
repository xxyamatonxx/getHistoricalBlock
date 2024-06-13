import { AvalancheXRpcClient } from "../clients/avalancheXRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const ENDPOINT = "https://rpc.ankr.com/avalanche-x";

interface BlockHeightAndDate {
  blockHeight: number,
  date: Date,
}

async function handler() {
  const client = new AvalancheXRpcClient(ENDPOINT);
  const startBlock = 350051; // 5月の最初の方のblock
  const endBlock = 334400; // 4月初日の23:59分以降のblock

  try {
    const blockAndDateGroup: BlockHeightAndDate[] = []
    for (let i = startBlock; i > endBlock; i --) {
      const date = await client.getBlockGeneratedAtByHeight(i);
      const blockAndDate: BlockHeightAndDate = {
        blockHeight: i,
        date: date,
      };

      console.log(blockAndDate);
      if (blockAndDate.date === null) {
        continue;
      }

      const minutes = 0;

      if (isCloseToMidnight(blockAndDate.date,minutes)) {
        console.log("対象発見");
        console.log(blockAndDate);
        blockAndDateGroup.push(blockAndDate);
        i -= 310;
      };
    };
    console.log(blockAndDateGroup);
    return blockAndDateGroup
  } catch (e: any) {
    console.error(e.message);
    throw new Error(e);
  }
} handler();