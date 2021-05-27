import React, { useEffect, useContext } from "react";
import { useHistory, UseHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../App.js";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      history.push("/login");
      dispatch({ type: "USER", payload: false });

      if (res.status === 200) {
        toast.success("Logout Succeed");
      }
    });
  }, []);
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
};

export default Logout;
