import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from './API';
import { LogEntryForm } from "./LogEntryForm";



const App = () => {
  const[logEntries, setLogEntires] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -96.665,
    zoom: 4
  });

  useEffect(() => {
    (async () =>{
      const logEntries = await listLogEntries();
      setLogEntires(logEntries)
      console.log(logEntries);
    })();
    //IIF immediately invoked function
  }, [])

  const showAddMarkerPopup = e => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/albertyee/ck6zz3n600b6g1hpeuh54s5so"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
      doubleClickZoom={false}
    >
      {logEntries.map(entry => (
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <img
              onClick={() =>
                setShowPopup({
                  ...showPopup,
                  [entry._id]: true
                })
              }
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`,
                maxHeight: "24px",
                maxWidth: `24px`
              }}
              src="https://i.imgur.com/y0G5YTX.png"
              alt="marker"
              className="marker"
            />
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              className="popup"
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() =>
                setShowPopup({
                  ...showPopup,
                  [entry._id]: false
                })
              }
              anchor="top"
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on:{new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <img
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`,
                maxHeight: "24px",
                maxWidth: `24px`
              }}
              src="https://i.imgur.com/y0G5YTX.png"
              alt="marker"
              className="marker"
            />
          </Marker>
          <Popup
            className="popup"
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <LogEntryForm 
              location={addEntryLocation}
            />
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}
export default App;