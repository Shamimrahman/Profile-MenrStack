import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const Herosec = () => {
  const [user, setUser] = useState({ name: "" });

  const getData = async () => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    setUser({ ...user, name: data.name });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Fade left>
        <section className="text-gray-400 bg-gray-900 body-font mt-5">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                Hello! {user.name}
              </h1>
              <p className="mb-8 leading-relaxed">
                Copper mug try-hard pitchfork pour-over freegan heirloom neutra
                air plant cold-pressed tacos poke beard tote bag. Heirloom echo
                park mlkshk tote bag selvage hot chicken authentic tumeric
                truffaut hexagon try-hard chambray.
              </p>
              <div className="flex justify-center ">
                <Link to="/login">
                  <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-800 rounded text-lg div-des">
                    Login
                  </button>
                </Link>

                <Link to="/registration">
                  <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-green-500 hover:text-white rounded text-lg div-des">
                    Registration
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://img.pngio.com/e-commerce-png-transparent-images-pictures-photos-png-arts-commerce-png-654_379.png"
              />
            </div>
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default Herosec;
