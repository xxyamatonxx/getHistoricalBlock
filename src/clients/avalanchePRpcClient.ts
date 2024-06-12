import axios from "axios";
import { unixToDate } from "../helper/dateHelper";

// gracier関連
const NETWORK = "mainnet";
const BLOCKCHAIN_ID = "11111111111111111111111111111111LpoYY"

// avalancheApi関連
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
    id: string
  },
}

interface GracireRes {
  blockNumber: number
  blockTimestamp: number,
}


export class AvalanchePRpcClient {

  constructor(
    private readonly avalancheApi: string,
    private readonly gracierApi: string,
  ) {
  }

  async getBlockGeneratedAtByHeight(blockHeight:number):Promise<Date> {
    const { block: { id } } = await this.getBlockByNumber(blockHeight)
    const { data:{ blockTimestamp } } = await this.getBlockByNumberGracier(id);
    return unixToDate(blockTimestamp);
  }

  async getBlockByNumberGracier(blockId: string): Promise<any> {
    const requestURL = `${this.gracierApi}/${NETWORK}/blockchains/${BLOCKCHAIN_ID}/blocks/${blockId}`
    const res = await axios.get(requestURL) as RpcResponse<GracireRes>;
    return res;
  };

  async getBlockByNumber(blockHeight:number): Promise<BlockResponse> {
    const requestData = {
      jsonrpc: JSON_RPC_VERSION,
      id: CHAIN_ID,
      method: "platform.getBlockByHeight",
        params: {
        height: blockHeight,
        encoding: "json"
      },
    };
    const { data : { result }} = (await axios.post(this.avalancheApi, requestData)) as RpcResponse<BlockResponse>;
    return result;
  };

};