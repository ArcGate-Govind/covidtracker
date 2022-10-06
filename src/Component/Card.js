import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fatchData = () => {
      axios.get(`${process.env.REACT_APP_USE0_KEY}`).then((response) => {
        setData(response.data);
      });
    };
    fatchData();
  }, []);

  return (
    <>
      <div class="container">
        <div class="row pt-5">
          <div class="col-4 pr-5">
            <div className="main_div">
              <div
                className="card  div1"
                style={{ width: "18rem", borderBottom: "5px solid purple" }}
              >
                <div className="card-body">
                  <h6 className="card-title">Infected</h6>
                  <h6 className="card-subtitle mb-2 text-muted pt-2 ">
                    {data?.confirmed?.value}
                  </h6>
                  <h6 className='date'> {new Date().toDateString()}</h6>
                  <p className="card-text">
                    Number of active cases of COVID-19
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div
              className="card"
              style={{ width: "18rem", borderBottom: "5px solid green" }}
            >
              <div className="card-body">
                <h6 className="card-title">recovered</h6>
                <h6 className="card-subtitle mb-2 text-muted pt-2">
                  {data?.recovered?.value}
                </h6>
                <h6 className='date'> {new Date().toDateString()}</h6>
                <p className="card-text">Number of Recoverd cases of COVID-19</p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div
              className="card"
              style={{ width: "18rem", borderBottom: "5px solid red" }}
            >
              <div className="card-body">
                <h6 className="card-title">deaths</h6>
                <h6 className="card-subtitle mb-2 text-muted pt-2">
                  {data?.deaths?.value}
                </h6>
                <h6 className='date'> {new Date().toDateString()}</h6>
                <p className="card-text">Number of Deaths cases of COVID-19</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
