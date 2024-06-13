import axios from "axios";
import { unixToDate } from "../helper/dateHelper";

export interface ISuiRpcClient {
  getLatestCheckpoint(): Promise<number>;
  getCheckpointTimestamp(checkpoint: number): Promise<Date>;
}


interface CheckpointDetail {
  epoch: string,
  sequenceNumber: string,
  digest: string,
  networkTotalTransactions: string,
  previousDigest: string,
  epochRollingGasCostSummary: {
    computationCost: string,
    storageCost: string,
    storageRebate: string,
    nonRefundableStorageFee: string,
  },
  timestampMs: string,
  transactions: string[],
  checkpointCommitments: [],
  validatorSignature: string,
}

export class SuiRpcClient implements ISuiRpcClient {

  constructor(private readonly endpoint:string) {
  }

  /**
   * 最新のcheckpointを返す
   * https://docs.sui.io/sui-api-ref#sui_getlatestcheckpointsequencenumber
   * @returns { Promise<number> }
   */
  async getLatestCheckpoint():Promise<number> {
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getLatestCheckpointSequenceNumber",
      params: []
    };

    const { data:{result} } = await axios.post(this.endpoint, requestData);
    return Number(result);
  }

  /**
   * 指定したcheckpointの詳細を返す
   * https://docs.sui.io/sui-api-ref#sui_getcheckpoint
   * @param { number } checkpoint - 詳細を取得したいcheckpoint
   * @returns { Promise<CheckpointDetail> }
   */
  async getCheckpointDetail(checkpoint: number): Promise<CheckpointDetail> {
    const requestData = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getCheckpoint",
      params: [String(checkpoint)]
    };
    const { data:{result}}  = await axios.post(this.endpoint, requestData);
    return result
  }

  /**
   * 指定したcheckpointのtimestampをUTCのUNIXで返す
   * @param { number } checkpoint  - UTCのUNIX timestampを取得したいcheckpoint
   * @returns { Promise<number> }
   */
  async getCheckpointTimestamp(checkpoint: number):Promise<Date> {
    const checkpointDetail = await this.getCheckpointDetail(checkpoint);
    return unixToDate(Number(checkpointDetail.timestampMs) / 1000);
  }
}