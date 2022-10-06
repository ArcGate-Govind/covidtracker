import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import Search from './Search';

const Card = () => {
const [data, setData] = useState()
    useEffect(() => {
        const fatchData = ()=>{
          axios.get('https://covid19.mathdro.id/api').then(response => {
              setData(response.data);
          })
        } 
        fatchData();
      },[]);

  return (
    <>
   <div className='main_div'>

    <div className="card  div1" style={{ width: "18rem",borderBottom:"5px solid purple" }}>
  <div className="card-body">
    <h5 className="card-title">Infected</h5>
     <h6 className="card-subtitle mb-2 text-muted">{data?.confirmed?.value}</h6>
     <h6> {new Date().toDateString()}</h6>
    <p className="card-text">
   Number of active cases of 
   COVID-19
    </p>
   
    
  </div>
</div>
  
<div className="card" style={{ width: "18rem" ,borderBottom:"5px solid green"}}>
  <div className="card-body">
    <h5 className="card-title">recovered</h5>
    <h6 className="card-subtitle mb-2 text-muted">{data?.recovered?.value}</h6>
    <h6> {new Date().toDateString()}</h6>
    <p className="card-text">
    Number of active cases of 
    COVID-19
    </p>
   
  </div>
</div>
    <div className="card" style={{ width: "18rem" ,borderBottom:"5px solid red"}}>
<div className="card-body">
  <h5 className="card-title">deaths</h5>
  <h6 className="card-subtitle mb-2 text-muted">{data?.deaths?.value}</h6>
  <h6> {new Date().toDateString()}</h6>
  <p className="card-text">
  Number of active cases of 
  COVID-19
  </p>
 
</div>
</div>  
</div>

 </>
  )
}

export default Card