import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput } from "../compenents/UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
  signIn,
  googleSignIn,
  twitterSignIn,
} from "../reducks/users/operations";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div>
      <h2>サインイン</h2>
      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <PrimaryButton
        label={"サインイン"}
        onClick={() => {
          dispatch(signIn(email, password));
          dispatch(push("/"));
        }}
      />
      <h2>Googleでサインイン</h2>
      <PrimaryButton
        label={"サインイン"}
        onClick={() => {
          dispatch(googleSignIn());
          dispatch(push("/"));
        }}
      />
      <h2>Twitterでサインイン</h2>
      <PrimaryButton
        label={"サインイン"}
        onClick={() => {
          dispatch(twitterSignIn());
          dispatch(push("/"));
        }}
      />
    </div>
  );
};

export default SignIn;
