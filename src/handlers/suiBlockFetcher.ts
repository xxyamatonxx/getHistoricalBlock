import { SuiRpcClient } from '../clients/suiRpcClient';
import { isCloseToMidnight } from '../helper/dateHelper';

const ENDPOINT = "https://fullnode.mainnet.sui.io:443";

interface checkoutAndDate {
  date: Date;
  checkout: number;
}

async function handler() {
  const client = new SuiRpcClient(ENDPOINT);
  const startCheckpoint = 32856300; // 5月最初のcheckpoint
  const endCheckpoint = 30258070; // 3月末のcheckpoint

  const checkpointAndDateGroup:checkoutAndDate[] = []
  for (let i = startCheckpoint; i > endCheckpoint; i-=30) {
    const date = await client.getCheckpointTimestamp(i);
    const checkoutAndDate:checkoutAndDate = {
      checkout: i,
      date: date,
    };

    console.log(checkoutAndDate);

    if (isCloseToMidnight(checkoutAndDate.date)) {
      console.log("対象発見");
      console.log(checkoutAndDate);
      checkpointAndDateGroup.push(checkoutAndDate);
      // 大体1日くらい遡る
      i -= 86000;
    };
  };
  console.log(checkpointAndDateGroup);
  return checkpointAndDateGroup
}
handler();