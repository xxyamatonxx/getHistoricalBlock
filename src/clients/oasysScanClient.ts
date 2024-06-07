import axios from "axios";

export class OasysScanClient {
  constructor(private readonly rpc: string) {
  }

  async getBlockNumberByUnix(unixTimestamp:number):Promise<number> {
    const requestPath = `?module=block&action=getblocknobytime&timestamp=${unixTimestamp}&closest=before`;
    const { data: { result: { blockNumber } } } = await axios.get(`${this.rpc}${requestPath}`);
    return blockNumber
  }
}