import { useState, useEffect } from "react";
import Map, { Marker} from "react-map-gl";
import "./App.css";

import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [val, setVal] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("https://data.nasa.gov/resource/y77d-th95.json");
    const data = await res.json();
    setVal(data);
  };

  return (
    <>
      <div className="App">
        <h1>Map</h1>
        <Map
          mapboxAccessToken="pk.eyJ1IjoicmFqYXQxNTMiLCJhIjoiY2w2YnNxa3BxMDBuYTNkbzUwbndsZGJpayJ9.txfjc1BOlM25t8kQf9pOsA"
          initialViewState={{
            longitude: 40,
            latitude: 40,
            zoom: 2.5,
          }}
          style={{
            width: "100%",
            height: 400,
            borderRadius: 10,
            border: "2px solid black",
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {val
            .filter((x) => x.geolocation)
            .map((item) => {
              return (
                <>
                  <Marker
                    longitude={item.geolocation.coordinates[0]}
                    latitude={item.geolocation.coordinates[1]}
                  >
                    <div className="MarkerStyle" />
                  </Marker>
                </>
              );
            })}
        </Map>
      </div>
    </>
  );
}

export default App;
