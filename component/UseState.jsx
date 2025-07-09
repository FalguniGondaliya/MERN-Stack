import React, { useState } from 'react'

function UseState() {
      let [count, setCount] = useState(0);

  const addValue = () => {
    setCount(count + 5);
    console.log(`my count is ${count}`);
  };

  const lessValue = () => {
    setCount(count - 1);
    console.log(`Clicked. Previous count was ${count}`);
  };

    return (

        <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center">Counter App</h1>
            <h2 className="text-4xl font-bold text-center text-blue-600 mt-8">Counter:{count}</h2>
            <button className="block mx-auto mt-10 bg-blue-600 text-white px-4 py-2 rounded" onClick={addValue}>Increase</button>
            
            <button className=" block mx-auto mt-10 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 " onClick={lessValue}>Decrease</button>
        </>

    )
}

export default UseState;