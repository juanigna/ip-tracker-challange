import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet"

function SetViewOnClick({ coords }: { coords: { lat: number, lng: number } }) {
    const map = useMapEvents({
        locationfound(e) {
            map.setView(e.latlng, map.getZoom())
        }
    })

    map.flyTo(coords, map.getZoom())

    return null
}


export default function Map({ lat, lng }: { lat: number, lng: number }) {

    let position = {
        lat,
        lng
    }

    const customIcon = L.icon({
        iconUrl: '/icon-location.svg',
    });

    return (
        <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} className="w-full h-[40rem]">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetViewOnClick coords={position} />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}