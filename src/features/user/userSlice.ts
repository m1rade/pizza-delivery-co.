import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { GetAddressBadResponse } from '../../services/apiGeocoding';
import { getAddress } from '../../services/apiGeocoding';
import { getPosition } from '../../utils/getPosition';

interface IPosition {
  latitude: number;
  longitude: number;
}
type UserSliceStatus = 'idle' | 'loading' | 'failed';

const initialState = {
  username: '',
  status: 'idle' as UserSliceStatus,
  error: '',
  position: {} as IPosition,
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddress.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.address = action.payload.address;
          state.position = action.payload.position;
        }
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload;
        } else {
          if (action.error.message) state.error = action.error.message;
        }
      });
  },
  selectors: {
    selectAddress: state => state.address,
    selectUserError: state => state.error,
    selectUserStatus: state => state.status,
    selectPosition: state => state.position,
  },
});

/* ========= Thunks ======= */

interface FetchAddressData {
  position: IPosition;
  address: string;
}

export const fetchAddress = createAsyncThunk<
  FetchAddressData,
  void,
  {
    rejectValue: string;
  }
>('user/fetchAddress', async (_, thunkAPI) => {
  try {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position: IPosition = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address } as FetchAddressData;
  } catch (error) {
    const geoError = error as GeolocationPositionError;
    const err = error as GetAddressBadResponse;
    return thunkAPI.rejectWithValue(geoError.message || err.description);
  }
});

/* ==================== */

export const { updateUsername } = userSlice.actions;

export const { selectAddress, selectPosition, selectUserError, selectUserStatus } = userSlice.selectors;

export default userSlice.reducer;
