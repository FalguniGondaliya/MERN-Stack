import React from 'react'

function App() {
  let a = 10;
  let b = "falguni"
  let c = true
  let arr = ["abc","pqr","lmn","xyz","devliiii"]
  let obj={
    name:"ABC",

  }
  return (
    <div>
      <h1>a</h1>
      <h1>"a"</h1>
      <h1>{a}</h1>
      <h1>{b}</h1>
      <h1>{JSON.stringify(c)}</h1>
     {
      arr.map((item,index)=>{
        return<h1>{item}</h1>
      })
     }
     {Object.entries(obj).map(([key, value], index) => (
        <h1><p key={index}>
          {key}: {value}
        </p></h1>
      ))}
    </div>
  )
}

export default App