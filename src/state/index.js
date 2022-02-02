import mapboxgl from 'mapbox-gl';
import {API_KEY} from "../secret";

let HM;

mapboxgl.accessToken = API_KEY;
let map;

const setHm = async () => {
    const RESONSE = await fetch('/output/hm.json');
    HM = await RESONSE.json();
    console.log(HM);
}

const addLayers = () => {
    console.log(HM.hm);
    map.addSource('original', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': HM.hm
        }
    });
    map.addLayer({
        'id': 'original',
        'type': 'symbol',
        'source': 'original',
        'layout': {
            'text-field': ['get', 'text'],
            'icon-image': 'hm',
            'icon-allow-overlap': false,
            'text-allow-overlap': false
        },
        paint: {
            "text-color": "#ffffff"
        },
        minzoom: 12,
    });
}


const setMap = (myMap) => {
    map = myMap;
    map.on('load', async () => {
        await setHm();
        map.loadImage("/hmpaal.png", async (err, image) => {
            map.addImage('hm', image);
            addLayers();
        });
    });
}

const fly = (location) => {
    map.jumpTo({
        center: location,
        essential: true,
        zoom: 18
    });
}

export {
    mapboxgl,
    map,
    setMap,
    fly,
    setHm,
}