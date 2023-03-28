import { RootStateT } from '@/redux/store';
import { NFTI } from '@/types';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface DashboardPageReducerI {
  selectedNFTs: NFTI[];
  collectionNfts: NFTI[];
}

// Define the initial state using that type
const initialState: DashboardPageReducerI = {
  selectedNFTs: [],
  collectionNfts: [],
};

export const dashboardPageReducer: Slice<DashboardPageReducerI> = createSlice({
  name: 'dashboardPage',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedNfts: (state, action: PayloadAction<NFTI>) => {
      let newSelectedNFTs = state.selectedNFTs;

      const findIndex = newSelectedNFTs.findIndex(
        (a) => a.nftId === action.payload.nftId
      );

      if (findIndex !== -1) newSelectedNFTs.splice(findIndex, 1);
      else newSelectedNFTs = [...state.selectedNFTs, action.payload];

      state.selectedNFTs = [...newSelectedNFTs];
    },
    setCollectionNfts: (state, action: PayloadAction<NFTI[]>) => {
      state.collectionNfts = action.payload;
    },
  },
});

export const { setSelectedNfts, setCollectionNfts } =
  dashboardPageReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectCreatePage = (state: RootStateT): DashboardPageReducerI =>
  state.dashboardPageReducer;

export default dashboardPageReducer.reducer;
