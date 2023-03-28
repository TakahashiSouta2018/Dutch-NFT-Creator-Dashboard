import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import Papa from 'papaparse';

// components
import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

// icons
import { ICSV, ICSVGreen } from '../svg';
import { CSVMetadataI } from '@/types';

interface CSVUploadProps {
  selectedCSVFileContent: CSVMetadataI[];
  setSelectedCSVFileContent: (value: CSVMetadataI[]) => void;
}

const CSVUpload: React.FC<CSVUploadProps> = ({
  selectedCSVFileContent,
  setSelectedCSVFileContent,
}) => {
  const { theme } = useTheme();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [selectedCSV, setSelectedCSV] = useState<File | null>(null);

  const handleOpen = () => {
    if (hiddenFileInput) {
      hiddenFileInput.current?.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files)
      return toast('file upload failed', { type: 'error' });

    const handleParseComplete = (result: any) => {
      const data = result.data;
      data.pop();
      setSelectedCSVFileContent(data);
    };

    Papa.parse(event.target.files[0], {
      complete: handleParseComplete,
      header: true,
    });
    setSelectedCSV(event.target.files[0]);
  };

  return (
    <DutchC.CSVUploadWrapper>
      {/* if files does not exist */}
      {!selectedCSV ? (
        <>
          <ICSV />
          <span className="mt-2 dark:text-white/70">Dimention 1:1</span>
          <span className="mb-2 dark:text-white/70">
            Drag and drop your CSV or
          </span>
          <OutlineButton size="small" onClick={handleOpen}>
            Upload CSV
          </OutlineButton>
        </>
      ) : (
        <>
          <DutchC.CSVUploadInner>
            <ICSVGreen />
            <DutchC.CSVUploadFileName>
              {selectedCSV.name}
            </DutchC.CSVUploadFileName>
          </DutchC.CSVUploadInner>

          {/* actions */}
          <DutchC.CSVUploadActions>
            <DutchC.CSVUploadMetaLengthLabel>
              {selectedCSVFileContent.length} metadata detected
            </DutchC.CSVUploadMetaLengthLabel>

            <Button size="small" onClick={handleOpen}>
              Re-Upload
            </Button>
          </DutchC.CSVUploadActions>
        </>
      )}
      {/* hidden input */}
      <input
        ref={hiddenFileInput}
        type="file"
        style={{ display: 'none' }}
        onChange={handleChange}
        accept=".csv"
      />
    </DutchC.CSVUploadWrapper>
  );
};

export default CSVUpload;
