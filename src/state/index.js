import mapboxgl from 'mapbox-gl';
import {API_KEY} from "../secret";

mapboxgl.accessToken = API_KEY;

export {
    mapboxgl
}