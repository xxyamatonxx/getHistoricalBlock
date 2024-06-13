import axios from "axios";
import { unixToDate } from "../helper/dateHelper";

export const JSON_RPC_VERSION = "2.0";
export const CHAIN_ID = 1;

interface RpcResponse<T> {
  data: {
    result: T,
  }
}

interface BlockResponse {
  block: {
    time: number,
    parentID: string,
    height: number,
    merkleRoot: string,
    txs: any[],
    id: string
  },
}


export class AvalancheXRpcClient {
  constructor(private readonly endpoint:string) {
  }


  async getBlockGeneratedAtByHeight(blockHeight:number):Promise<Date> {
    const { block: { time : unixTime} } = await this.getBlockByNumber(blockHeight)
    return unixToDate(unixTime);
  }


  async getBlockByNumber(blockHeight:number): Promise<BlockResponse> {
    const requestData = {
      jsonrpc: JSON_RPC_VERSION,
      id: CHAIN_ID,
      method: "avm.getBlockByHeight",
        params: {
        height: blockHeight,
        encoding: "json"
      },
    };
    const { data : { result }} = (await axios.post(this.endpoint, requestData)) as RpcResponse<BlockResponse>;
    return result;
  };
};