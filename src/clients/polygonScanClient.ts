import axios from "axios";

const API_KEY = "your_api_key";

export class PolygonScanClient {
  constructor(private readonly rpc: string) {
  }

  async getBlockNumberByUnix(unixTimestamp:number):Promise<number> {
    const requestPath = `?module=block&action=getblocknobytime&timestamp=${unixTimestamp}&closest=before&apikey=${API_KEY}`;
    const { data: { result } } = await axios.get(`${this.rpc}${requestPath}`);
    return Number(result);
  }
}