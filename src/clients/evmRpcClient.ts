import axios from "axios";
import { unixToDate } from '../helper/dateHelper';

interface IEvmRpcClient {

}

export class EvmRpcClient implements IEvmRpcClient {
  constructor(private readonly endpoint: string) {
  }

  async getLatestBlockNumber():Promise<number> {
    const requestData = {
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 83,
    };
    const { data: { result } } = await axios.post(this.endpoint, requestData);
    const decodeBlockNumber = parseInt(result, 16);
    return decodeBlockNumber
  }

  async getBlockByNumber(blockNumber: number) {
    const hexBlockNumber = `0x${blockNumber.toString(16)}`;
    const requestData = {
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: [hexBlockNumber,false],
      id: 83,
    };
    const response = await axios.post(this.endpoint, requestData);
    const timestamp = response?.data?.result?.timestamp;
    // timestampが存在しない場合の処理
    if (!timestamp) {
        return null; // または適切なデフォルト値やエラーハンドリング
    }

    const unixTimestamp = parseInt(timestamp, 16);
    return unixToDate(unixTimestamp);
  }

}
