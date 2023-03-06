import { LooseObjectI } from '@/types';
import axios from 'axios';

const headers = {
  pinata_api_key: String(process.env.NEXT_PUBLIC_PINATA_API_KEY),
  pinata_secret_api_key: String(process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY),
};

const pinFile = async (file: File) => {
  const data = new FormData();
  data.append('file', file);

  try {
    const result = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      data,
      {
        // @ts-ignore
        maxBodyLength: 'Infinity',
        headers,
      }
    );
    if (result.data) return result.data.IpfsHash;
  } catch (error: any) {
    console.log(error);
  }
};

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const dataUrlToFile = async (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',');
  if (arr.length < 2) return undefined;
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) return undefined;
  const mime = mimeArr[1],
    buff = Buffer.from(arr[1], 'base64');
  return new File([buff], filename.replaceAll('/', '_'), { type: mime });
};

export const pinFileToIPFS = async (images: string[]) => {
  const iPFSHashArray: string[] = [];
  try {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const title = `${i}`;

      if (image) {
        const file = await dataUrlToFile(image, title);
        if (file) {
          const result = await pinFile(file);
          if (result) iPFSHashArray.push(result);
        }
      }
    }
    return iPFSHashArray;
  } catch (error: any) {
    console.log(error);
  }
};

export const pinFolderToIPFS = async (formData: FormData) => {
  try {
    const headers = {
      pinata_api_key: String(process.env.NEXT_PUBLIC_PINATA_API_KEY),
      pinata_secret_api_key: String(
        process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
      ),
    };
    const result = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        // @ts-ignore
        maxBodyLength: 'Infinity',
        headers: {
          ...headers,
          //@ts-ignore
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
    );
    if (result.data) return result.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const pinJSONToIPFS = async (metadata: LooseObjectI) => {
  try {
    const data = { ...metadata };

    const result = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      { headers }
    );

    if (result.data) return result.data.IpfsHash;
  } catch (error: any) {
    console.log(error);
  }
};
