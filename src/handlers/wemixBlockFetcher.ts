import { EvmRpcClient } from "../clients/evmRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const ENDPOINT = "https://api.wemix.com";

interface BlockAndDate {
  date: Date,
  blockNumber: number,
}

async function handler() {
  const client = new EvmRpcClient(ENDPOINT);

  const startBlock = 48287100; // 5月の最初の方のblock
  const endBlock = 45694927; // 3月末のblock

  const blockAndDateGroup:BlockAndDate[] = []
  for (let i = startBlock; i > endBlock; i-=30) {
    const date = await client.getBlockByNumber(i);
    const blockAndDate:BlockAndDate = {
      date: date,
      blockNumber: i,
    };

    console.log(blockAndDate);

    if (isCloseToMidnight(blockAndDate.date)) {
      console.log("対象発見");
      console.log(blockAndDate);
      blockAndDateGroup.push(blockAndDate);
      i -= 86000;
    };
  };
  console.log(blockAndDateGroup);
  return blockAndDateGroup
}
handler()