import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, provider } from "../../Firebase";
import axios from "axios";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;

        dispatch(
          signInAction({
            isSignedIn: true,
            uid: uid,
            email: email,
          })
        );
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const email = user.email;

        dispatch(
          signInAction({
            isSignedIn: true,
            uid: uid,
            email: email,
          })
        );

        dispatch(push("/"));
      }
    });
  };
};

export const googleSignIn = () => {
  return async (dispatch) => {
    return auth.signInWithPopup(provider).then(async (result) => {
      const user = result.user;
      const uid = user.uid;
      const email = user.email;
      const isNewUser = result.additionalUserInfo.isNewUser;

      if (isNewUser) {
        const token = await user.getIdToken(true);
        const config = { headers: { authorization: `Bearer ${token}` } };
        try {
          await axios.post(
            "http://localhost:3001/api/v1/users/new",
            { email: email },
            config
          );
        } catch (error) {
          console.log(error);
        }
      }

      dispatch(push("/"));
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        const user = result.user;

        if (user) {
          const token = await user.getIdToken(true);
          const config = { headers: { authorization: `Bearer ${token}` } };
          try {
            await axios.post(
              "http://localhost:3001/api/v1/users/new",
              { email: email },
              config
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction);
      dispatch(push("/signin"));
    });
  };
};
