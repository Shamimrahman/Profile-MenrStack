import React, { useState } from "react";
import PeopleIcon from "@material-ui/icons/People";
import EmailIcon from "@material-ui/icons/Email";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Adminreg = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const inputHandle = async (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cpassword } = user;
      const res = await fetch("/adminreg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        window.alert("Unsuccessfull");
      } else {
        window.alert("Login");

        history.push("/adminlogin");
      }
    } catch (error) {}
  };
  return (
    <div>
      <Fade left>
        <section className="mt-14 ml-16">
          <div className="flex flex-col w-full lg:w-5/3 justify-center mt-2">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h1 className="text-center sm:ml-2 -ml-9 text-xl">
                    Admin Form
                  </h1>

                  <div className="  relative flex flex-col min-w-0 break-words w-2/3 mb-6  rounded-lg reg-css sm:mt-6 mt-6 sm:ml-24 -ml-9 justify-content-center">
                    <form method="POST">
                      <div className="relative w-full   mat-icon ">
                        <PeopleIcon></PeopleIcon>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="border outline-none  border-gray-800 focus:border-gray-700 px-3 py-3 rounded text-sm  w-3/5
       reg-css text-white-500 ml-2"
                          placeholder="Your Name"
                          required
                          onChange={inputHandle}
                          value={user.name}
                        />
                      </div>

                      <div className="relative w-full mb-3  mat-icon ">
                        <EmailIcon></EmailIcon>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="border outline-none  border-gray-800 focus:border-gray-700 px-3 py-3 rounded text-sm  w-3/5
       reg-css text-white-500 ml-2 "
                          placeholder="Your Email"
                          style={{ transition: "all 0.15s ease 0s" }}
                          required
                          onChange={inputHandle}
                          value={user.email}
                        />
                      </div>

                      <div className="relative w-full mb-3 ml-32 mat-icon ">
                        <VisibilityIcon></VisibilityIcon>

                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="border outline-none  border-gray-800 focus:border-gray-700 px-3 py-3 rounded text-sm  w-3/5
 reg-css text-white-500 ml-2 "
                          placeholder="Your Password"
                          style={{ transition: "all 0.15s ease 0s" }}
                          required
                          onChange={inputHandle}
                          value={user.password}
                        />
                      </div>

                      <div className="relative w-full mb-3 ml-32 mat-icon ">
                        <VisibilityIcon></VisibilityIcon>
                        <input
                          type="password"
                          name="cpassword"
                          id="cpassword"
                          className="border outline-none  border-gray-800 focus:border-gray-700 px-3 py-3 rounded text-sm w-3/5
reg-css text-white-500 ml-2 "
                          placeholder="Confirm Password"
                          style={{ transition: "all 0.15s ease 0s" }}
                          required
                          onChange={inputHandle}
                          value={user.cpassword}
                        />
                      </div>

                      <div className="text-center mt-8 mb-3 sm:mr-24 ml-28">
                        <button
                          id="feedbackBtn"
                          className="bg-gray-700 hover:bg-green-600 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                          style={{ transition: "all 0.15s ease 0s" }}
                          onClick={saveData}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fade>
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
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Adminreg;

<h1>Admin Registration Place</h1>;
