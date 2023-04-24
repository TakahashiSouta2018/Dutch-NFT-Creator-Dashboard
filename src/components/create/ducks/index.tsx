import { RootStateT } from '@/redux/store';
import { DraftNFTResponseI, MintingNftsI, MintStatusEnum } from '@/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialMintModalState = {
  isOpen: false,
  isDepositOpen: false,
  activeStep: 0,
  mintingNfts: [],
};

export interface UpdateMintNftStatusI {
  id: number;
  status: MintStatusEnum;
}

export interface MintModalI {
  isOpen: boolean;
  isDepositOpen: boolean;
  activeStep: number;
  mintingNfts: MintingNftsI[];
}

// Define a type for the slice state
export interface CreatePageReducerI {
  draftNFTs: DraftNFTResponseI[];
  selectedDraftNFTs: DraftNFTResponseI[];
  mintModal: MintModalI;
}

// Define the initial state using that type
const initialState: CreatePageReducerI = {
  draftNFTs: [],
  selectedDraftNFTs: [],
  mintModal: initialMintModalState,
};

export const createPageReducer: Slice<CreatePageReducerI> = createSlice({
  name: 'createPage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDraftNFTs: (state, action: PayloadAction<DraftNFTResponseI[]>) => {
      state.draftNFTs = action.payload;
    },
    setSelectedDraftNFTs: (
      state,
      action: PayloadAction<DraftNFTResponseI[]>
    ) => {
      state.selectedDraftNFTs = action.payload;
    },
    setMintModalActiveStep: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        mintModal: { ...state.mintModal, activeStep: action.payload },
      };
    },
    setMintModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.mintModal.isOpen = action.payload;
    },
    setDepositModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.mintModal.isDepositOpen = action.payload;
    },
    setMintingNfts: (state, action: PayloadAction<MintingNftsI[]>) => {
      state.mintModal.mintingNfts = action.payload;
    },
    updateMintNftStatus: (
      state,
      action: PayloadAction<UpdateMintNftStatusI>
    ) => {
      const updatedNfts = state.mintModal.mintingNfts.map((mintingNft) => {
        if (mintingNft.id === action.payload.id) {
          return { ...mintingNft, status: action.payload.status };
        }
        return mintingNft;
      });
      state.mintModal.mintingNfts = updatedNfts;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setDraftNFTs,
  setMintModalActiveStep,
  setMintModalIsOpen,
  setDepositModalIsOpen,
  setMintingNfts,
  updateMintNftStatus,
  setSelectedDraftNFTs,
} = createPageReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectCreatePage = (state: RootStateT): CreatePageReducerI =>
  state.createPageReducer;

export default createPageReducer.reducer;
