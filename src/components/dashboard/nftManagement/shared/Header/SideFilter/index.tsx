import React, { useEffect, useState } from 'react';
import * as Icons from '@/common';
import { IconButton, SearchInput, TextInput } from '@/common';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { WebAppReducerI } from '@/ducks';
import { shallowEqual } from 'react-redux';
import useNFTManagement from '@/hooks/useNFTManagement';
import assert from 'assert';
import { CreateNftManagementI } from '@/types';
import { setManagementNFTs } from '@/components/dashboard/ducks';

interface SideFilterProps {
  openFilter: boolean;
  onFilter: () => void;
}

enum MintRangeEnum {
  MIN,
  MAX,
}

const SideFilter: React.FC<SideFilterProps> = ({
  openFilter,
  onFilter,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    getUserNFTByAvailablity,
    getUserNFTByCollection,
    getAllUserNFTAttribute,
    getUserNFTByAttribute,
  } = useNFTManagement();

  const [mintRange, setMintRange] = useState<{
    amount: number;
    available: number;
  }>({ amount: 1000, available: 0 });

  const [firstAttributeSearchInput, setFirstAttributeSearchInput] =
    useState<string>('');

  const [nftAttributes, setNftAttributes] = useState<Record<
    string,
    string[]
  > | null>(null);

  const { account, userCollection } = useAppSelector((state) => {
    const { account, userCollection } = state.webAppReducer as WebAppReducerI;
    return { account, userCollection };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      if (account) {
        const attributes = await getAllUserNFTAttribute(account);
        if (attributes) {
          setNftAttributes(attributes);
        }
      }
    })();
  }, [account]);

  const handleRangeSet = async (value: number, type: MintRangeEnum) => {
    const min = type === MintRangeEnum.MIN ? value : mintRange.amount;
    const available =
      type === MintRangeEnum.MAX ? value : mintRange.available;

    assert(account, 'account === null');

    const nfts = await getUserNFTByAvailablity(account, min, available);

    console.log({ nfts });

    if (nfts) dispatch(setManagementNFTs(nfts));

    if (type === MintRangeEnum.MIN) {
      setMintRange((prevState) => ({ ...prevState, amount: Number(value) }));
    } else
      setMintRange((prevState) => ({ ...prevState, available: Number(value) }));
  };

  const handleSelectCollection = async (collectionAddress: string) => {
    assert(account, 'account === null');

    const nfts = await getUserNFTByCollection(account, collectionAddress);

    console.log({ nfts });

    if (nfts) dispatch(setManagementNFTs(nfts));
  };

  const handleSelectAttribute = async (value: string) => {
    assert(account, 'account === null');

    const nfts = await getUserNFTByAttribute(account, value);

    console.log({ nfts });

    if (nfts) dispatch(setManagementNFTs(nfts));
  };

  console.log({ nftAttributes });

  const hasNFTAttributes =
    nftAttributes && Object.keys(nftAttributes).length > 0;

  return (
    <div
      className={`
        flex flex-col divide-y w-[14vw] text-sm gap-2 p-2 
        transition border border-black/10 rounded-lg bg-white
        ${!openFilter ? 'absolute left-0 -translate-x-full' : ''}
      `}
    >
      <div className="flex gap-2 items-center">
        <IconButton icon="close" onClick={onFilter} />
        <div className="font-bold text-black/50">Filters</div>
      </div>

      <div className="flex flex-col p-2 gap-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Available NFTs</div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-black/70 font-normal">Reset</div>
            <Icons.IChevronUp />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <TextInput
            onChange={(e) =>
              handleRangeSet(Number(e.target.value), MintRangeEnum.MIN)
            }
            placeholder="25"
            className="dark:bg-white dark:text-black dark:placeholder:text-black  dark:accent-white"
          />
          <div className="font-bold text-black/70">to</div>
          <TextInput
            onChange={(e) =>
              handleRangeSet(Number(e.target.value), MintRangeEnum.MAX)
            }
            placeholder="30"
            className="dark:bg-white dark:text-black dark:placeholder:text-black  dark:accent-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Collections</div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-black/70 font-normal">Reset</div>
            <Icons.IChevronUp />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2">
          {userCollection.map((collection, index) => (
            <div className="px-2 py-1 flex gap-2 items-center" key={index}>
              <TextInput
                type="checkbox"
                onChange={() =>
                  handleSelectCollection(collection.collectionAddress)
                }
                className={
                  'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                }
              />
              <div className="w-[10vw] whitespace-nowrap  overflow-hidden overflow-ellipsis font-normal text-sm text-black/70">
                {collection.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex justify-between p-2">
          <div className="font-bold text-black/70">Properties</div>

          {hasNFTAttributes && (
            <div className="flex gap-2 items-center">
              <div className="text-xs text-black/70 font-normal">
                {Object.keys(nftAttributes)[0]}
              </div>
              <Icons.IChevronUp />
            </div>
          )}
        </div>

        {hasNFTAttributes && (
          <>
            <SearchInput
              placeholder="Search"
              onChange={(e) => setFirstAttributeSearchInput(e.target.value)}
              className={
                'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
              }
            />
            <div className="flex flex-col gap-2 p-2">
              {Object.values(nftAttributes)[0].map((value) => (
                <div className="px-2 py-1 flex gap-2 items-center" key={value}>
                  <TextInput
                    type="checkbox"
                    onChange={() => handleSelectAttribute(value)}
                    className={
                      'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                    }
                  />
                  <div className="overflow-hidden font-bold text-black/70">
                    {value}
                  </div>
                </div>
              ))}

              {/* <div className="px-2 py-1 flex gap-2 items-center">View more</div> */}
            </div>
          </>
        )}
      </div>

      {hasNFTAttributes && Object.keys(nftAttributes).length > 1 && (
        <div className="px-2 py-1 flex flex-col gap-2 p-2">
          {Object.keys(nftAttributes).map((key, index) => {
            if (index !== 0) {
              return (
                <>
                  <div className="gap-2 flex justify-between p-2" key={index}>
                    <div className="font-bold text-black/70">{key}</div>
                    <Icons.IChevronDown />
                  </div>

                  <>
                    <SearchInput
                      placeholder="Search"
                      className={
                        'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                      }
                    />
                    <div className="flex flex-col gap-2 p-2">
                      {Object.values(nftAttributes)[index].map((value) => (
                        <div
                          className="px-2 py-1 flex gap-2 items-center"
                          key={value}
                        >
                          <TextInput
                            type="checkbox"
                            onChange={() => handleSelectAttribute(value)}
                            className={
                              'dark:bg-white dark:text-black/100 dark:placeholder:text-black dark:border-black dark:accent-white'
                            }
                          />
                          <div className="overflow-hidden font-bold text-black/70">
                            {value}
                          </div>
                        </div>
                      ))}

                      {/* <div className="px-2 py-1 flex gap-2 items-center">View more</div> */}
                    </div>
                  </>
                </>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default SideFilter;
