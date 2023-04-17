import Image from 'next/image';

// components
import { Table, THead, TBody, TR, TD } from '@/common';
import { CSVMetadataI } from '@/types';

interface PropsI {
  selectedCSVFileContent: CSVMetadataI[];
  imageUrls: string[];
}

const PreviewTable = ({ selectedCSVFileContent, imageUrls }: PropsI) => {
  return (
    <div className="col-span-2 flex flex-col space-y-1">
      <label className="text-sm font-medium text-black/70 dark:text-white/70">
        NFT Preview <br />
        The previews are shown according to the files you upload.
      </label>
      <div className="flex grow items-center justify-center border border-black/10 rounded-lg text-sm text-black/70 dark:text-white/70 dark:border-white/10">
        <div className="relative w-full h-full overflow-x-auto">
          {/* preview table */}
          <Table>
            <THead>
              <TR>
                <TD>Media</TD>
                <TD>Name</TD>
                <TD>Unit</TD>
                <TD>Royalty</TD>
                <TD>Description</TD>
                <TD>Properties</TD>
              </TR>
            </THead>
            <TBody>
              {selectedCSVFileContent.length === imageUrls.length &&
                selectedCSVFileContent.map((csvFileContent, index) => {
                  return (
                    <TR key={index}>
                      <TD className="flex items-center space-x-2 text-sm text-black font-medium dark:text-white">
                        <Image
                          src={imageUrls[index]}
                          alt=""
                          width={40}
                          height={40}
                          className="border border-black/10 rounded dark:border-white/10"
                        />
                        <span>{csvFileContent.name}</span>
                      </TD>
                      <TD className="text-sm text-black dark:text-white whitespace-nowrap">
                        {csvFileContent.name}
                      </TD>
                      <TD className="text-sm text-black dark:text-white">
                        {csvFileContent.amount}
                      </TD>
                      <TD className="text-sm text-black dark:text-white">
                        {csvFileContent.royalties}
                      </TD>
                      <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                        {csvFileContent.description}
                      </TD>
                      <TD className="text-sm text-black dark:text-white max-w-[190px] truncate">
                        {csvFileContent.properties}
                      </TD>
                    </TR>
                  );
                })}
            </TBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PreviewTable;
