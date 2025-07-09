import React, { useState } from 'react';

function BackChange() {
  const [bgColor, setBgColor] = useState("bg-white"); // default screen color
  const [btnText, setBtnText] = useState("Hello I am Old Button");
  const [btnColor, setBtnColor] = useState("bg-blue-500");

  const changeColor = () => {
    setBgColor("bg-yellow-200"); // change screen background
    setBtnColor("bg-yellow-300"); // change button background
    setBtnText("Hello I am New Button"); // change button text
  };
   const backcolor = () => {
    setBgColor("bg-pink-200"); // change screen background
    setBtnColor("bg-red-300"); // change button background
    setBtnText("Hello I am second Button"); // change button text
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor}`}>
      <button onClick={changeColor}className={`px-6 py-3 text-white rounded ${btnColor}`}>
        {btnText}
      </button>
      <button onClick={backcolor}className={`px-6 py-3 text-white rounded ${btnColor}`}>
        {btnText}
      </button>
    </div>
  );
}

export default BackChange;
