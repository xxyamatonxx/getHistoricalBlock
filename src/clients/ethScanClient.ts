import axios from "axios";

const API_KEY = "TQ8NURWRENH8Q47QBPQR551FK1V37UIXWV";

export class EthScanClient {
  constructor(private readonly rpc: string) {
  }

  async getBlockNumberByUnix(unixTimestamp:number):Promise<number> {
    const requestPath = `?module=block&action=getblocknobytime&timestamp=${unixTimestamp}&closest=before&apikey=${API_KEY}`;
    const { data:{result} } = await axios.get(`${this.rpc}${requestPath}`);
    return Number(result);
  }
}