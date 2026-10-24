import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios"

function App() {
const [trips,setTrips] = useState([])

useEffect(()=>{getTrips()},[])

const getTrips = async () => {
    const result = await axios.get("http://localhost:4001/trips?keywords=1")
    setTrips(result.data.data);
}


  return <div className="App">{
    <>
    <section class="search-bar">
      <h1>เที่ยวไหนดี</h1>
      <label htmlFor="trip-search">ค้นหาที่เที่ยว</label>
      <input id="trip-search" type="text" placeholder="หาที่เที่ยวแล้วไปกัน...." />
    </section>
    {/*test box*/}
    <section className="trips-list">
      <img className="trip-main-img" src="./src/assets/react.svg" alt="" />
      <h2 className="trip-heading">heading...........</h2>
      <p className="trip-content">content</p>
      <div class="trip-catagory">
        <span>catagory</span>
      </div>
      <div trip-show-img>
        <img src="./src/assets/react.svg" alt="" />
      </div>
      <a href=""><img src="" alt="" /></a>
    </section>

    </>
  }</div>;
}

export default App;
