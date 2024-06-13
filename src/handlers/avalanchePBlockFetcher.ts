import { AvalanchePRpcClient } from "../clients/avalanchePRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const AVALANCHE_ENDPOINT = "https://rpc.ankr.com/avalanche-p";
const GRACIRE_ENDPOINT = "https://glacier-api.avax.network/v1/networks"


interface BlockHeightAndDate {
  blockHeight: number,
  date: Date,
}


async function handler() {
  const client = new AvalanchePRpcClient(AVALANCHE_ENDPOINT,GRACIRE_ENDPOINT);

  const startBlock = 13119300; // 5月の最初の方のblock
  const endBlock = 12348525; // 4月初日の23:59分以降のblock

  try {
    const blockAndDateGroup: BlockHeightAndDate[] = []
    for (let i = startBlock; i > endBlock; i -= 100) {
      try{
        const date = await client.getBlockGeneratedAtByHeight(i);
        const blockAndDate: BlockHeightAndDate = {
          blockHeight: i,
          date: date,
        };

        console.log(blockAndDate);
        if (blockAndDate.date === null) {
          continue;
        }

        if (isCloseToMidnight(blockAndDate.date)) {
          console.log("対象発見");
          console.log(blockAndDate);
          blockAndDateGroup.push(blockAndDate);
          i -= 10100;
        };
      } catch (e: any) {
        console.error(e.message);
        continue;
      }
    };
    console.log(blockAndDateGroup);
    return blockAndDateGroup
  } catch (e: any) {
    console.error(e.message);
    throw new Error(e);
  }
}handler()