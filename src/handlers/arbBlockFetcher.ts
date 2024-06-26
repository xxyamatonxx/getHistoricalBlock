import { ArbScanClient } from "../clients/arbiscanClient";
import { unixToDate } from "../helper/dateHelper";

const ENDPOINT = "https://api.arbiscan.io/api";

async function handler() {
  const client = new ArbScanClient(ENDPOINT);

  const startDate = new Date(Date.UTC(2024, 4, 31,23,59,59)); // 2024年5月31日
  const endDate = new Date(Date.UTC(2024, 3, 1, 23, 59, 59)); // 2024年4月1日

  const responseObj: {date:Date,blockNumber:number}[] = [];

  for (let date = startDate; date >= endDate; date.setUTCDate(date.getUTCDate() - 1)) {
    const unix = Math.floor(date.getTime() / 1000);
    const blockNumber = await client.getBlockNumberByUnix(unix);
    console.log(unixToDate(unix));
    console.log(blockNumber);
    responseObj.push({date:new Date(date),blockNumber:blockNumber})
  }
  console.log(responseObj);
  return responseObj;
}handler()