export interface IClient {
  name: string;
  contractCount: number;
  designCount: number;
  videoCount: number;
  ads: {
    youtube: boolean;
    facebook: boolean;
    instagram: boolean;
    tiktok: boolean;
  };
  contractAmount: number;
  payAmount: number;
  dueAmount: number;
}
