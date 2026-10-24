import "./App.css";
import { useState,useEffect } from "react";
import axios from "axios"

function App() {
const [filterText,setFilterText] = useState();
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
    <section class="search-bar">
      <h1>เที่ยวไหนดี</h1>
      <label htmlFor="trip-search">ค้นหาที่เที่ยว</label>
      <input id="trip-search" type="text" value={filterText} placeholder="หาที่เที่ยวแล้วไปกัน...." 
      onChange={(event)=>{
          setFilterText(event.target.value)
        }
      }/>
    </section>
   {console.log(trips) /*test*/}
   <section className="trips-list">
    {trips.map((trip)=>(
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
        <a href={trip.url}><img src="" alt="url-link" /></a>
      </div>
      )
    )}
    </section>
    </>
  }</div>;
}

export default App;
