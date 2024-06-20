import { UserModel } from '@/models/userModel';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserModel = {
  email: '',
  name: '',
  token: null,
  role: null,
  avatar: null,
  is_verified: false,
  is_email_verification: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.is_verified = action.payload.is_verified;
      state.is_email_verification = action.payload.is_email_verification;
      console.log(action.payload);
    },
    resetUser: (state) => {
      state = initialState;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
