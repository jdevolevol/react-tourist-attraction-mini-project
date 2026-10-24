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
    <section className="search">
      <label htmlFor="search__input">ค้นหาที่เที่ยว</label>
      <input className="search__input" type="text" value={filterText} placeholder="หาที่เที่ยวแล้วไปกัน...." 
      onChange={(event)=>{
          setFilterText(event.target.value)
        }
      }/>
    </section>
   <section className="content">
    {trips.length === 0 ?<p className="content--notice">ไม่พบข้อมูล</p>
      : trips.map((trip)=>(
      <div className="trip" key={trip.eid}>
        <img className="trip__main-photo" src={trip.photos[0]} alt="" />
        <div className="trip-content">
          <h2 className="trip__title">{trip.title}</h2>
          <p className="trip__description">{trip.description}</p>
          <a href="">อ่านต่อ...</a>
          <div className="trip-tags">
            <span className="trip__head-tag">หมวด</span>
          {trip.tags.map((tag,index)=>(
            <span class="trip__tag" key={index}>{tag}</span>
            )
          )}
          </div>
          <div className="trip-photos">
            {trip.photos.slice(1).map((photo,index)=>(
                <img className="trip__photo" key={index} src={photo} alt="trip-photo" />
              )
            )}
          </div>
          <a className="trip__url" href={trip.url}><img src="./src/img/link-icon.svg" alt="" /></a>
        </div>
      </div>
      )
      )
    }
    </section>
    </>
  }</div>;
}

export default App;
