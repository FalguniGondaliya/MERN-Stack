import React from 'react'

function Person({username,color}) {
  return (
    <div>
        <h1>{username}</h1>
        <h2>{color}</h2>
    </div>
  )
}

export default Person