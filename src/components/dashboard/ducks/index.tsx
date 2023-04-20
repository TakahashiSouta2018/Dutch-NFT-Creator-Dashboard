import { RootStateT } from '@/redux/store';
import { CreateNftManagementI, NFTI } from '@/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export enum TrackListTypeEnum {
  NFT = 'NFT',
  COLLECTION = 'COLLECTION',
}

export interface TrackListI {
  id: string;
  type: TrackListTypeEnum;
  avatar: string;
  title: string;
  content: string;
  isSelected: boolean;
}
// Define a type for the slice state
export interface DashboardPageReducerI {
  selectedNFTs: NFTI[];
  collectionNfts: NFTI[];
  trackList: TrackListI[];
  managementNFTs: CreateNftManagementI[];
}

// Define the initial state using that type
const initialState: DashboardPageReducerI = {
  selectedNFTs: [],
  collectionNfts: [],
  trackList: [],
  managementNFTs: [],
};

export const dashboardPageReducer: Slice<DashboardPageReducerI> = createSlice({
  name: 'dashboardPage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedNfts: (state, action: PayloadAction<NFTI>) => {
      let newSelectedNFTs = state.selectedNFTs;

      const findIndex = newSelectedNFTs.findIndex(
        (a) => a.nftID === action.payload.nftID
      );

      if (findIndex !== -1) newSelectedNFTs.splice(findIndex, 1);
      else newSelectedNFTs = [...state.selectedNFTs, action.payload];

      state.selectedNFTs = [...newSelectedNFTs];
    },
    resetSelectedNfts: (state) => {
      state.selectedNFTs = [];
    },
    setCollectionNfts: (state, action: PayloadAction<NFTI[]>) => {
      state.collectionNfts = action.payload;
    },
    setTrackList: (state, action: PayloadAction<TrackListI[]>) => {
      state.trackList = action.payload;
    },
    setManagementNFTs: (
      state,
      action: PayloadAction<CreateNftManagementI[]>
    ) => {
      state.managementNFTs = action.payload;
    },
  },
});

export const {
  setSelectedNfts,
  setCollectionNfts,
  setTrackList,
  resetSelectedNfts,
  setManagementNFTs,
} = dashboardPageReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectCreatePage = (state: RootStateT): DashboardPageReducerI =>
  state.dashboardPageReducer;

export default dashboardPageReducer.reducer;
