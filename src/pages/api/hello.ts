import { MintNFTPostDataI } from '@/types';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error?: any;
  status: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(400)
        .send({ status: 'failed', error: 'Wrong HTTP Method' });
    }

    const { postData, apiKey }: { postData: MintNFTPostDataI; apiKey: string } =
      req.body;

    const headers = {
      'X-API-KEY': apiKey,
    };

    const result = await axios.post(
      'https://api3.loopring.io/api/v3/nft/mint',
      { ...postData },
      { headers }
    );

    return res.status(200).json({ status: 'success', data: result.data });
  } catch (error: any) {
    console.log({ error: error.response.data });
    return res
      .status(error.statusCode || 500)
      .json({ status: 'failed', error: error.response.data });
  }
}
