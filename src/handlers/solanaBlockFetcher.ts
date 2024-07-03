import { SolanaRpcClient } from "../clients/solanaRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/wK4pETh_myFavYVuMpjqXdI6Nla88W8k";

interface slotAndDate {
  slot: number;
  date: Date;
}

async function handler() {
  const client = new SolanaRpcClient(ENDPOINT);
  // const latestSlot = await client.getLatestSlot();
  //5月の初めのblock
  const latestSlot = 263167865
  //3月末のblock
  const endSlot = 257597065

  const slotAndDateGroup:slotAndDate[] = []
  for (let i = latestSlot; i > endSlot; i-=60) {
    const date = await client.getBlockTimestamp(i);
    const slotAndDate:slotAndDate = {
      slot: i,
      date: date,
    };

    console.log(slotAndDate);

    if (isCloseToMidnight(slotAndDate.date)) {
      console.log("対象発見");
      console.log(slotAndDate);
      slotAndDateGroup.push(slotAndDate);
      // 大体1日くらい遡る
      i -= 170000;
    };
  };
  console.log(slotAndDateGroup);
  return slotAndDateGroup
}
handler();