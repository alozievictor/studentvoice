import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
    const [color] = React.useState("#36A398");
  return (
    <div className="inset-0 fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-70 z-50 flex justify-center items-center">
      <BounceLoader
        color={color}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;

