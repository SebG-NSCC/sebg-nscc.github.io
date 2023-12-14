//create map in leaflet and tie it to the div called 'theMap'
const map = L.map('theMap').setView([44.650627, -63.597140], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Set a custom icon as the marker (bus)
let iconOptions = {
    iconUrl: 'bus.png',
    iconSize: [25, ]
}
let customIcon = L.icon(iconOptions);
var markerOptions = {
    title: 'bus image',
    clickable: true,
    draggable: false,
    icon: customIcon
} 

//query the api to get the bus data
    async function getData(){
        const response = await fetch('https://prog2700.onrender.com/hrmbuses');
        let busInformation = await response.json();

        //get the information for bus routes <= 10
        let busArray = busInformation.entity.filter((bus) => {
            return bus.vehicle.trip.routeId <= 10;
        })

        //convert to GeoJSON format
        busGeoJsonArray = busArray.map((bus) => {
            return geojsonFeatureCollection = {
                'type': 'FeatureCollection',
                'features':{
                    'properties': {
                        'position': {
                            'bearing': `${bus.vehicle.position.bearing}`,
                            'latitude': `${bus.vehicle.position.latitude}`,
                            'longitude': `${bus.vehicle.position.longitude}`,
                            'speed': `${bus.vehicle.position.speed}`,
                        },
                        'trip': {
                            'routeId': `${bus.vehicle.trip.routeId}`,
                            // 'startDate': `${bus.vehicle.trip.startDate}`,
                            // 'tripId': `${bus.vehicle.trip.tripId}`,
                        },
                        'vehicle': {
                            'id': `${bus.vehicle.vehicle.id}`,
                            'label': `${bus.vehicle.vehicle.label}`,
                        }
                    },
                    'geometry':{
                        'type': 'Point',
                        'coordinates': [`${bus.vehicle.position.latitude}`, `${bus.vehicle.position.longitude}`],
                        'show_on_map': true
                    }
                }
            }
            
        });

        //add each bus to a layer and then add that layer to the map
        var busLayer = new L.layerGroup();
        busGeoJsonArray.filter((bus) => {

            //function to display 0 if bus speed is undefined
            function calculateBusSpeed() {
                if (bus.features.properties.position.speed === 'undefined'){
                    return 0;
                }
                else {
                    return bus.features.properties.position.speed;
                }
            }

            //configure content displayed in popup
            var popup = L.popup(bus.features.geometry.coordinates, {content: `<p><b>Route: ${bus.features.properties.trip.routeId}</b></p><p>Vehicle ID: ${bus.features.properties.vehicle.id}</p><p>Speed: ${calculateBusSpeed()}</p>`});

            L.marker(bus.features.geometry.coordinates, markerOptions).setRotationAngle(bus.features.properties.position.bearing).bindPopup(popup).addTo(busLayer);
        })
        busLayer.addTo(map);

        //clear the layer that holds all of the buses
        setTimeout(() => {
            busLayer.clearLayers();
        }, 5000);
}

//Refresh bus data every 5 seconds
setInterval(function (){   
    getData();
}, 5000);