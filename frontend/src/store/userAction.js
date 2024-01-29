import { notificationActions } from "./notificationSlice";
import { host } from "./userSlice";
import { getLoggedUserInfo } from "./getInfo";

//Login User
export const loginUser = (credential) => {
  return async (dispatch) => {
    
    const loginUserAsync = async () => {
      dispatch(
        notificationActions.makeNotification({
          message: "Sending request for login",
          type: "info",
          loading:true,
          open: true,
        })
      );
      try {
        const response = await fetch(`${host}/api/auth/loginuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
          await getLoggedUserInfo(data.authToken, dispatch);
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message,
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };

    await loginUserAsync();
  };
};

//CreateNewUser and Login
export const signUpUser = (credential) => {
  return async (dispatch) => {
    const signUpUserAsync = async (credential) => {
      dispatch(
        notificationActions.makeNotification({
          message: "Sending request for create new account",
          type: "info",
          loading: true,
          open: true,
        })
      );
      try {
        const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });

        const data = await response.json();

        if (response.ok) {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "success",
              loading:false,
              open: true,
            })
          );
          await getLoggedUserInfo(data.authToken, dispatch);
        } else {
          dispatch(
            notificationActions.makeNotification({
              message: data.message,
              type: "warning",
              loading:false,
              open: true,
            })
          );
        }
      } catch (error) {
        dispatch(
          notificationActions.makeNotification({
            message: error.message,
            type: "error",
            loading:false,
            open: true,
          })
        );
      }
    };

    await signUpUserAsync(credential);
  };
};
