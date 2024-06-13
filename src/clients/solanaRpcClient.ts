import axios from 'axios';
import { unixToDate } from '../helper/dateHelper';

export interface ISolanaRpcClient {
  getLatestSlot(): Promise<number>;
  getBlockTimestamp(blockHeight: number): Promise<Date>
}
export class SolanaRpcClient implements ISolanaRpcClient {

  constructor(
    private readonly endpoint: string )
  {
  }

  /**
   * 最新のblockHeightを返す
   * https://solana.com/docs/rpc/http/getblockheight
   * @returns { Promise<number> }
   */
  async getLatestSlot():Promise<number> {
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "getSlot",
    };
    const { data: {result} } = await axios.post(this.endpoint, requestData);
    return Number(result);
  }

  /**
   * 指定したblockHeightのblockを取得する
   * https://solana.com/docs/rpc/http/getblocktime
   * @param { number } blockHeight - 詳細を指定したいblockHeight
   * @return { Promise<number | null> }
   */
  async getBlockTimestamp(blockHeight:number):Promise<Date> {
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBlockTime",
      params: [blockHeight],
    };
    const {data: {result}} = await axios.post(this.endpoint, requestData);
    return unixToDate(result);
  };
}