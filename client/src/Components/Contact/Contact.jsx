import React, { useEffect, useState } from "react";
import "./Contact.css";
import Fade from "react-reveal/Fade";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const history = useHistory();
  //get data from db
  const getData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      setUser({
        ...user,
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        message: data.message,
      });
    } catch (error) {
      toast.warning("Please Login to Send Review");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //store data
  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const { name, email, mobile, message } = user;

      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name,
          mobile,
          email,
          message,
        }),
      });

      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Empty Message Field");
      } else {
        toast.success("Message Send Successfully");
        //message send korar por message filed ta empty korte hob
        setUser({ ...user, message: "" });
      }
    } catch (error) {}
  };

  return (
    <div>
      <section>
        <div className=" text-black py-20 -mt-40">
          <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
            <Fade top>
              <div className="flex flex-col w-full lg:w-1/3 p-8 md:mt-20">
                <p className=" text-green-600  text-4xl sm:text-3xl bold uppercase tracking-loose font-sans sm:-mt-9 mt-10">
                  REVIEW
                </p>

                <p className="text-3xl md:text-4xl my-4 leading-relaxed text-white md:leading-snug">
                  Leave us a feedback!
                </p>
                <p className="text-sm md:text-base leading-snug text-white text-opacity-100">
                  Please provide your valuable feedback and something something
                  ...
                </p>
              </div>
            </Fade>

            <Fade right>
              <div className="flex flex-col w-full lg:w-5/3 justify-center mt-2">
                <div className="container w-full px-4">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-lg bg-gray-900 div-des">
                        <div className="flex-auto p-5 lg:p-10 div-des">
                          <h4 className="text-xl mb-4 text-white font-semibold">
                            Have a suggestion?
                          </h4>
                          <form id="feedbackForm" method="POST">
                            <div className="relative w-full mb-3 ">
                              <label
                                className="block uppercase text-gray-400 text-xs font-bold mb-2"
                                for="email"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="border border-gray-800 focus:border-gray-600 px-3 py-3 rounded text-sm shadow-xl w-full
                         placeholder-black text-gray-400 outline-none css-des input-focus"
                                placeholder={user.name}
                                style={{ transition: "all 0.15s ease 0s" }}
                                required
                                value={user.name}
                                onChange={inputHandle}
                              />
                            </div>

                            <div className="relative w-full mb-3 text-gray-400 ">
                              <label>EMAIL</label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                className="border border-gray-800 focus:border-gray-600 px-3 py-3 rounded text-sm shadow-xl w-full
                         text-gray-400 outline-none css-des input-focus"
                                placeholder={user.email}
                                style={{ transition: "all 0.15s ease 0s" }}
                                required
                                value={user.email}
                              />
                            </div>

                            <div className="relative w-full mb-3 ">
                              <label
                                className="block uppercase text-gray-400 text-xs font-bold mb-2"
                                for="email"
                              >
                                Phone
                              </label>
                              <input
                                type="number"
                                name="mobile"
                                id="mobile"
                                className="border border-gray-800 focus:border-gray-600 px-3 py-3 rounded text-sm shadow-xl w-full
                              placeholder-black text-gray-400 outline-none css-des input-focus"
                                placeholder={user.mobile}
                                style={{ transition: "all 0.15s ease 0s" }}
                                required
                                value={user.mobile}
                                onChange={inputHandle}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-gray-400 text-xs font-bold mb-2"
                                for="message"
                              >
                                Message
                              </label>
                              <textarea
                                maxlength="300"
                                name="message"
                                id="feedback"
                                rows="1"
                                cols="80"
                                className="border border-gray-800 focus:border-gray-600 px-3 py-3 rounded text-sm shadow-xl w-full
                              placeholder-black text-gray-400 outline-none css-des input-focus"
                                placeholder=""
                                required
                                value={user.message}
                                onChange={inputHandle}
                              ></textarea>
                            </div>
                            <div className="text-center mt-6">
                              <button
                                id="feedbackBtn"
                                className="bg-gray-600 focus:bg-green-500 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="submit"
                                style={{ transition: "all 0.15s ease 0s" }}
                                onClick={sendMessage}
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
              </div>
            </Fade>
          </div>
        </div>
      </section>
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

export default Contact;
