"use client";
import Starfield from "../components/Starfield";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { useState, useEffect } from "react";
export default function Page() {
  const [count, setCount] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const [countThree, setCountThree] = useState(0);
  return (
    <>
      <div className="top-0 fixed left-0 w-full min-h-screen">
        <Starfield />
      </div>
      <div className="px-4 sm:px-16 pt-7 md:pt-20">
        <div>
          <div id="home" className="block md:flex gap-12">
            <img
              src="avata.png"
              alt=""
              className="w-52 mx-auto md:mx-0 md:w-72 rounded-full md:rounded-sm border border-purple-400"
            />
            <div className="space-y-2  md:space-y-6 text-center md:text-start">
              <p className="text-3xl mt-4 md:mt-0 md:text-5xl font-bold md:font-semibold text-center md:text-start ">
                Hi, I'm Albert 🖐️
              </p>
              <p className="text-2xl md:text-5xl tracking-wider text-center md:text-start md:tracking-widest font-extrabold bg-linear-90 from-blue-500 to-purple-700 text-transparent bg-clip-text">
                Full Stack Developer.
              </p>
              <p className="tracking-normal md:tracking-widest md:text-xl">
                I build scalable web applications and turn ideas into reality.
              </p>
              <div className="block md:flex gap-3">
                <button className="rounded-md w-full md:w-auto text-md py-2 px-7 relative z-100 bg-linear-60 font-bold from-blue-400 via-blue-500 to-purple-600">
                  View Projects
                </button>
                <button className="backdrop-blur-md w-full md:w-auto text-md py-2 px-7 bg-white/15 font-bold mt-4 md:mt-0 rounded-md">
                  Contact Me
                </button>
              </div>
              <span className="flex text-xl mt-3 md:mt-0 md:justify-start justify-center gap-6">
                <FaGithub></FaGithub>
                <FaLinkedin></FaLinkedin>
                <FaTwitter></FaTwitter>
                <AiFillMail></AiFillMail>
                {/* <FaMailBulk></FaMailBulk> */}
              </span>
            </div>
          </div>
          <hr className="text-gray-500 mt-24" />
        </div>
        <div id="about" className="pt-9">
          <p className="text-center text-3xl font-semibold">About Me</p>
          <p className="text-center mx-1 md:mx-64 mt-5 tracking-widest">
            I'm a passionate full stack developer with experience in creating
            modern and responsive web applications. I love solving problems,
            learning new technologies and building projects that makes a
            difference.
          </p>
          <div className="flex flex-1 gap-6 justify-center mt-6">
            <div className="bg-white/20 py-2 px-8 w-64 text-sm rounded-md">
              <span className="text-3xl font-semibold">+5</span> <br /> Years of
              Experience
            </div>
            <div className="bg-white/20 py-2 px-8 w-64 text-sm rounded-md">
              <span className="text-3xl font-semibold">+20</span> <br /> Completed Projects
            </div>
            <div className="bg-white/20 py-2 px-8 w-64 text-sm rounded-md">
              <span className="text-3xl font-semibold">6</span> <br /> Programming Languages Known
            </div>
            <div className="bg-white/20 py-2 px-8 w-64 text-sm rounded-md">
              <span className="text-3xl font-semibold">+15</span> <br /> Satisfied Clients
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
