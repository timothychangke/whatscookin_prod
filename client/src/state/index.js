import { createSlice } from '@reduxjs/toolkit';

//state accessible throughout the entire application
const initialState = {
  //light mode or dark mode
  mode: 'light',
  //user information
  user: null,
  //auth token
  token: null,
  //post information
  posts: [],
};

//the boilerplate code
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //actions that modify the global state
  reducers: {
    setMode: (state) => {
      //toggle between light mode and dark mode
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      //set user state
      state.user = action.payload.user;
      //set token state
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      //remove user state information
      state.user = null;
      //remove user token information
      state.token = null;
    },
    setFriends: (state, action) => {
      //check if user exists
      if (state.user) {
        //set user friends state
        state.user.friends = action.payload.friends;
      } else {
        console.error("user's friends do not exist");
      }
    },
    setPosts: (state, action) => {
      //set user posts as posts state
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer
