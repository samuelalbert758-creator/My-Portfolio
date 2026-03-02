import Image from 'next/image';
import { FaBars } from 'react-icons/fa'
const Header = () => {
  return (
    <header className="">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-2xl sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Portfolio
        </h1>
        <div className="lg:hidden md:hidden  px-1 py-1 bg-white/10 rounded-md flex items-center">
          {/* <FaBars className="text-white text-2xl cursor-pointer" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#FFFFFF"
          >
            <path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" />
          </svg>
        </div>
        <div className="lg:flex hidden sm:hidden md:flex items-center space-x-3 sm:space-x-6 ">
          {/* <Image src={undefined} alt='country flag' width={25} height={13} className="rounded-full shadow-md cursor-pointer"  /> */}
          <p className="cursor-pointer"> HOME </p>
          <p> ABOUT </p>
          <p> SKILLS </p>
          <p> PROJECTS </p>
          <p> CONTACT </p>
        </div>
      </div>

      <hr className="lg:hidden md:hidden block h-0.5 bg-gray-400 border-none" />
    </header>
  );
}

export default Header