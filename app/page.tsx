import Starfield from "../components/Starfield";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <div className="top-0 fixed left-0 w-full min-h-screen">
        <Starfield />
      </div>
      <div id="home">
      </div>
    </>
  );
}