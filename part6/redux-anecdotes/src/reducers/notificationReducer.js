import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationText: (state, action) => action.payload,
    clearNotificationText: () => "",
  },
});

export const { setNotificationText, clearNotificationText } =
  notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotificationText(content));
    setTimeout(() => {
      dispatch(clearNotificationText());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
