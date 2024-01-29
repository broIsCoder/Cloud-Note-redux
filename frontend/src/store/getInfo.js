import { notificationActions } from "./notificationSlice";
import { userActions } from "./userSlice";
import { host } from "./userSlice";

//Get UserInfo
export const getLoggedUserInfo = async (authToken, dispatch) => {
  // dispatch(
  //   notificationActions.makeNotification({
  //     message: "Sending Request for User Info",
  //     type: "warning",
  //     open: true,
  //   })
  // );
  try {
    const response = await fetch(`${host}/api/auth/userinfo`, {
      method: "POST",
      headers: {
        "auth-token": `${authToken}`,
      },
    });

    const userInfo = await response.json();
    if (response.ok) {
      dispatch(userActions.logIn());
      dispatch(
        userActions.setUserInfo({
          authToken: authToken,
          name: userInfo.user.name,
          email: userInfo.user.email,
        })
      );
      localStorage.setItem(
        "AuthToken",
        JSON.stringify(authToken)
      );
    } else {
      dispatch(
        userActions.setUserInfo({
          name: null,
          email: null,
        })
      );
    }
  } catch (error) {
    dispatch(
      notificationActions.makeNotification({
        message: error.message,
        type: "error",
        open: true,
      })
    );
  }
};
