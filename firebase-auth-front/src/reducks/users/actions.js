export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      email: userState.email,
    },
  };
};

export const GOOGLE_SIGN_IN = "GOOGLE_SIGN_IN";
export const googleSignInAction = (userState) => {
  return {
    type: "GOOGLE_SIGN_IN",
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      email: userState.email,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      email: "",
    },
  };
};
