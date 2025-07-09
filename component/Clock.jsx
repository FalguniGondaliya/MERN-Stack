import React, { useState, useRef } from 'react';

function Timer() {
  const [time, setTime] = useState(0); // start from 0
  const timer = useRef(null);

  const start = () => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1); // increase by 1 every second
      }, 1000);
    }
  };

  const pause = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const reset = () => {
    clearInterval(timer.current);
    timer.current = null;
    setTime(0); // reset to 0
  };

  return (
    <div className='  text-center mt-10'>
      <h2 className='text-3xl'>Timer: {time} sec</h2>
      <div className='flex flex-wrap justify-center gap-5'>
      <button onClick={start}className=' inline-flex text-xl rounded-md bg-blue-400  '>Start</button>
      <button onClick={pause} className='text-xl rounded bg-yellow-400'>Pause</button>
      <button onClick={reset}className='text-xl rounded bg-red-500'>Reset</button>
      </div>
    </div>
  );
}

export default Timer;
