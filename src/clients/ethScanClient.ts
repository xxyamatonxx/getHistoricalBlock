import axios from "axios";
import { getConfig } from "../helper/configHelper";

const API_KEY = getConfig("ApiKey.ethScan");

export class EthScanClient {
  constructor(private readonly rpc: string) {
  }

  async getBlockNumberByUnix(unixTimestamp:number):Promise<number> {
    const requestPath = `?module=block&action=getblocknobytime&timestamp=${unixTimestamp}&closest=before&apikey=${API_KEY}`;
    const { data:{result} } = await axios.get(`${this.rpc}${requestPath}`);
    return Number(result);
  }
}