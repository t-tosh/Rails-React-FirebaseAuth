import React from "react";
import { getUserId, getUserEmail } from "../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const email = getUserEmail(selector);
  console.log(uid);
  console.log(email);

  return (
    <div>
      <h2>Home</h2>
      <p>UID: {uid}</p>
      <p>email: {email}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
