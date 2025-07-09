import React, { useEffect, useState } from 'react'

function UseEffect() {
    let [count, setCount] = useState(0)


    useEffect(() => {
        alert('Hello I am Counter')
        console.log("running useEffect hook ")
    },[])



    const addValue = () => {
        setCount(count + 1)
        
    }
    const lessValue =()=>{
        setCount(count-1)
    }

    return (
        <div className='text-3xl'>
            <h1 className='text-bold'>I am Learing UseEffect</h1>
            <div>
                <h1>Counter :{count}</h1>
                <div>
                    <button onClick={addValue}>plus    </button>
                     <button onClick={lessValue}    >minus</button>
                </div>
            </div>
        </div>
    )
}

export default UseEffect