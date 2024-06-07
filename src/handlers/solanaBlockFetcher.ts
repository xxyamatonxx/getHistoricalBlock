import { SolanaRpcClient } from "../clients/solanaRpcClient";
import { isCloseToMidnight } from "../helper/dateHelper";

const ENDPOINT = "https://solana-mainnet.g.alchemy.com/v2/wK4pETh_myFavYVuMpjqXdI6Nla88W8k";

interface slotAndDate {
  slot: number;
  date: Date;
}

const DAY_SECOND = 86400;

async function handler() {
  const client = new SolanaRpcClient(ENDPOINT);
  // const latestSlot = await client.getLatestSlot();
  //5月の初めのblock
  const latestSlot = 263167865
  //3月末のblock
  const endSlot = 257597065

  const slotAndDate:slotAndDate[] = []
  for (let i = latestSlot; i > endSlot; i-=60) {
    const date = await client.getBlockTimestamp(i);
    const slotAndDatum:slotAndDate = {
      slot: i,
      date: date,
    };

    console.log(slotAndDatum);

    if (isCloseToMidnight(slotAndDatum.date)) {
      console.log(true);
      console.log(slotAndDatum);
      slotAndDate.push(slotAndDatum);
      i -= 170000;
    };
  };
  console.log(slotAndDate);
  return slotAndDate
}
// async function handler() {
//   const client = new SolanaRpcClient(ENDPOINT);
//   // const latestSlot = await client.getLatestSlot();
//   const latestSlot = 263197065

//   const slotAndDate:slotAndDate[] = []
//   for (let i = latestSlot; latestSlot > 0; i -= 40000) {
//     const date = await client.getBlockTimestamp(i);
//     const slotAndDatum:slotAndDate = {
//       slot: i,
//       date: date,
//     };
//     slotAndDate.push(slotAndDatum);
//   }
//   return slotAndDate
// }
handler();