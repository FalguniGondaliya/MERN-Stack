import React, { useState, useEffect } from 'react';

function Timer() {
    let [time, setTime] = useState(0);
   
  useEffect(() => {
    let interval = setInterval(() => {
      console.log("interval time", time);

      setTime((prev) => {
        if (prev >= 10) {
          console.log("prev value", prev);

          clearInterval(interval);
          return prev;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => {
      console.log("cleaning running");

      clearInterval(interval);
    };
  }, [time]);

    //right approach Way -1 
    // useEffect(() => {
    //     let id = setInterval(() => {
    //         console.log("interval running", time)
    //         // setTime(prev =>prev +1)
    //     }, 1000)
    //     return () => {
    //         console.log("cleaning running")
    //         clearInterval(id)
    //     }
    // }, []);
    //wrong approach way -2
    // useEffect(() => {
    //     let id = setInterval(() => {
    //         console.log("interval running", time)
    //         setTime(time + 1)
    //     }, 1000)
    //     return () => {
    //         console.log("cleaning running")
    //         clearInterval(id)
    //     }
    // }, [time]);

    return (

        <div>
            <h1>Timer: {time}</h1>
        </div>
    );
}

export default Timer;
