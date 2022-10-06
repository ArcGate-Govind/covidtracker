import React, { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../App.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


const Search = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [allData, setAllData] = useState({
    confirmed: [],
    deaths: [],
  });

  useEffect(() => {
    const fatchValue = async () => {
      await axios.get(`${process.env.REACT_APP_USE1_KEY}`).then((response) => {
        setCountries(response.data.countries);
      });
    };
    fatchValue();
  }, []);

  console.log(process.env);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_USE_KEY}`).then((response) => {
        setAllData({
          ...allData,
          confirmed: response.data,
          deaths: response.data,
        });
      });
    };
    fetchData();
  }, []);

  const handleChange = async (event) => {
    setCountry(event.target.value);

    await axios.get(`${process.env.REACT_APP_USE_KEY}`).then((response) => {
      const filteredConfirmed = response.data.filter(
        (obj) => obj.countryRegion === event.target.value
      );
      const filteredDeaths = response.data.filter(
        (obj) => obj.countryRegion === event.target.value
      );
      setAllData({
        ...allData,
        confirmed: filteredConfirmed,
        deaths: filteredDeaths,
      });
    });
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const convertDate = (timestamp) => {
    const ts = new Date(timestamp);
    const localDate = ts.toLocaleDateString();
    return localDate.replace(/(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1");
  };

  const data = {
    labels:
      allData.confirmed &&
      allData.confirmed.map((obj) => convertDate(obj.lastUpdate)),
    datasets: [
      {
        label: "Infected",
        data:
          allData.confirmed && allData.confirmed.map((obj) => obj.confirmed),
        borderColor: "#3333ff",
        fill: true,
      },
      {
        label: "Deaths",
        data: allData.deaths && allData.deaths.map((obj) => obj.deaths),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  return (
    <div>
      <FormControl
        style={{ display: "flex", width: "50%", margin: "2rem auto" }}
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Countries
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={country}
          onChange={handleChange}
          label="Countries"
        >
          {countries?.map((item, i) => {
            return (
              <MenuItem key={i} value={item.name}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div style={{ width: "90%", margin: "auto" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Search;
