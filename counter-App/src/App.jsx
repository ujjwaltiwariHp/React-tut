import{ useState } from 'react'



function App (){

  const [count, setCount] = useState(0)
  return (
    <div style={{textAlign:"center", marginTop:"300px", fontSize:"20px"}}>

      <h1>Counter :{count}</h1>

      <button onClick ={()=> setCount(count+1)}>Increment</button>
      <button onClick ={()=> setCount(count-1)}>Decrement</button>
      <button onClick ={()=> setCount(0)}>Reset</button>
      
    </div>
  )
}

export default App