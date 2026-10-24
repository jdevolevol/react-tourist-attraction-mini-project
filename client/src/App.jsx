import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios"

function App() {
const [filterText,setFilterText] = useState("");
const [trips,setTrips] = useState([]);

useEffect(()=>{
    const deleyDebounce = setTimeout(()=>{
      getTrips();
    },500);
    return ()=>clearTimeout(deleyDebounce);
},[filterText]);

const getTrips = async () => {
    const result = await axios.get(`http://localhost:4001/trips?keywords=${filterText}`);
    setTrips(result.data.data);
}

  return <div className="App">{
    <>
      <h1 className="title">เที่ยวไหนดี</h1>
      <section className="search-bar">
      <label htmlFor="trip-search">ค้นหาที่เที่ยว</label>
      <input className="trip-search" type="text" value={filterText} placeholder="หาที่เที่ยวแล้วไปกัน...." 
      onChange={(event)=>{
          setFilterText(event.target.value)
        }
      }/>
    </section>
   <section className="trips-list">
    {!filterText ?<p className="notice">กรุณาพิมพ์</p>
      :trips.length === 0 ?<p className="notice">ไม่พบข้อมูล</p>
      : trips.map((trip)=>(
      <div className="trip-list" key={trip.eid}>
        <img className="trip-main-img" src={trip.photos[0]} alt="" />
        <h2 className="trip-title">{trip.title}</h2>
        <p className="trip-description">{trip.description}</p>
        
        <div class="trip-tags">
          <span>หมวด</span>
        {trip.tags.map((tag,index)=>(
          <span class="trip-tag" key={index}>{tag}</span>
          )
        )}
        </div>
        <div class="trip-photos">
          {trip.photos.slice(1).map((photo,index)=>(
              <img className="trip-photo" key={index} src={photo} alt="trip-photo" />
            )
          )}
        </div>
        <a href={trip.url}><img src="./src/img/link-icon.svg" alt="" /></a>
      </div>
      )
      )
    }
    </section>
    </>
  }</div>;
}

export default App;
