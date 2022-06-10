import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map() {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["drawing"]
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current as any, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      var drawingManager1 = new google.maps.drawing.DrawingManager();
      console.log(drawingManager1)
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        markerOptions: {
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(map);
    });
  });
  return <div id="map" ref={googlemap} />;
}
export default Map;
