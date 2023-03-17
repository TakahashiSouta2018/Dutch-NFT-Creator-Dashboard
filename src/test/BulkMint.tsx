import { useState } from 'react';
import { pinFolderToIPFS } from '@/lib/pinata';
import Papa from 'papaparse';
import { CSVMetadataI } from '@/types';
import { construcMetadata } from '@/lib/metadata';
import { LoopringService } from '@/lib/LoopringService';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import ConnectWallet from '@/components/shared/connect-wallet';
import { AppLayout } from '@/components';

const FolderUpload = () => {
  const [selectedImageFolder, setSelectedImageFolder] =
    useState<FileList | null>(null);
  const [selectedCSVFileContent, setSelectedCSVFileContent] = useState<
    CSVMetadataI[]
  >([]);

  const loopringService = new LoopringService();

  const { walletType, accountInfo } = useAppSelector((state) => {
    const { walletType, accountInfo } = state.webAppReducer;
    return { walletType, accountInfo };
  }, shallowEqual);

  const changeCSVHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return alert('file upload failed');

    const handleParseComplete = (result: any) => {
      const data = result.data;
      data.pop();
      setSelectedCSVFileContent(data);
    };

    Papa.parse(event.target.files[0], {
      complete: handleParseComplete,
      header: true,
    });
  };

  const changeFolderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return alert('file upload failed');

    const fileSet = new Set<string>();

    Array.from(files).forEach((file) => {
      if (fileSet.has(file.name)) {
        alert(`File ${file.name} is not unique`);
        return;
      }
      fileSet.add(file.name);
    });

    setSelectedImageFolder(files);
  };

  const handleSubmission = async () => {
    if (!selectedImageFolder || !accountInfo) {
      return;
    }

    const selectedImageFolderArr = Array.from(selectedImageFolder);

    if (selectedImageFolderArr.length !== selectedCSVFileContent.length) {
      return alert('Uploaded image not equal to the CSV metadata');
    }

    const formData = new FormData();
    const fileNames: string[] = [];

    const min = 1;
    const max = 10000000000; // 10 billion

    selectedImageFolderArr.forEach((file) => {
      formData.append('file', file);
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      fileNames.push(`${randomNumber}${file.name}`);
    });

    console.log({ fileNames });

    const metadata = JSON.stringify({
      name: 'Folder name', // update to collection name
    });

    formData.append('pinataMetadata', metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append('pinataOptions', options);

    try {
      const folderCID = await pinFolderToIPFS(formData);

      const nftDataArray = construcMetadata({
        folderCID,
        csvFileContents: selectedCSVFileContent,
        imageNames: fileNames,
        animationUrlNames: fileNames,
        collectionMetadata:
          'https://nftinfos.loopring.io/0x4a160986c99ec5a35a91471c4c738e46dc2ab647',
      });

      for (let index = 0; index < nftDataArray.length; index++) {
        const nftData = nftDataArray[index];

        const res = await loopringService.mintNFT({
          accountInfo,
          walletType,
          metadata: nftData,
          amount: selectedCSVFileContent[index].amount,
          royaltyPercentage: nftData.royalty_percentage,
          nftTokenAddress: '0x4a160986c99ec5a35a91471c4c738e46dc2ab647',
        });

        console.log({ res });
      }

      // await Promise.all(
      //   nftDataArray.map((nftData, index) =>
      //     loopringService.mintNFT({
      //       accountInfo,
      //       walletType,
      //       metadata: nftData,
      //       amount: selectedCSVFileContent[index].amount,
      //       royaltyPercentage: nftData.royalty_percentage,
      //       nftTokenAddress: '0x4a160986c99ec5a35a91471c4c738e46dc2ab647',
      //     })
      //   )
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <ConnectWallet />
      <label className="form-label">choose Image Folder</label>
      <br />
      <input
        // @ts-ignore
        directory=""
        webkitdirectory=""
        type="file"
        onChange={changeFolderHandler}
      />
      <br />
      <br />
      <label className="form-label">choose CSV Folder</label>
      <br />
      <input accept=".csv" type="file" onChange={changeCSVHandler} />
      <br />
      <br />
      <button onClick={handleSubmission}>Submit</button>
    </AppLayout>
  );
};

export default FolderUpload;
