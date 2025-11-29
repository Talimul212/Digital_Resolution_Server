export interface IClient {
  // Existing fields
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

  name: string;
  location: string;
  number: string;
  gmail: string;
  projectDetails: string;
  status: 'ongoing' | 'completed';
  logo: string;
}
