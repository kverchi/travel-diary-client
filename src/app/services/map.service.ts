import { Injectable, OnInit } from '@angular/core';
import { Sight } from '../model/sight';
import {
    GeoSearchControl,
    EsriProvider,
} from 'leaflet-geosearch';
import {Subject} from "rxjs/index";

declare let L;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    isDevMode:boolean;
    map:any;

    private searchLocation:any;
    private searchLocationChanged: Subject<any> = new Subject<any>();


    constructor() {

    }
    private changeSearchLocation(e: any) {
        this.searchLocationChanged.next(e.location);
    }
    ngOnInit() {

    }
    getSearchLocation() {
        return this.searchLocation;
    }
    resetSearchLocation() {
        this.searchLocationChanged.next(null);
    }
    initMap(latitude:number, longitude:number, zoom:number) {
        var center = new L.LatLng(latitude, longitude);
        this.map = L.map('map').setView(center, zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets',
                maxZoom: 18,
                accessToken: 'pk.eyJ1Ijoia3ZlcmNoaSIsImEiOiJjanlyd2NncnMwOTdtM2NwNThuMHVreGpzIn0.GiLeL75YtFDxkEvvBOw5lQ'
            } as any).addTo(this.map);
    }

    initGeosearch() {
        this.searchLocationChanged.subscribe((value) => {
            this.searchLocation = value;
        });
        var self = this;
        const provider = new EsriProvider();

        const searchControl = new GeoSearchControl({
            provider: provider,
            style: 'button',
            marker: {
                icon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 29],
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
                })
            },
            popupFormat: ({ query, result }) => result.label
        });
        this.map.addControl(searchControl);
        this.map.on('geosearch/showlocation', function (e) {
            console.log(e);
            console.log(e.location.label);
            self.changeSearchLocation(e);

        });

    }

    setMarkers(markers:any) {
        for (let place of markers) {
            new L.marker(
                [place.latitude, place.longitude], {
                    icon: L.icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 29],
                        iconUrl: 'assets/marker-icon.png',
                        shadowUrl: 'assets/marker-shadow.png'
                    })
                }).bindPopup(place.label).addTo(this.map)
        }
    }

    setMarker(marker:any) {
        new L.marker(
            [marker.latitude, marker.longitude], {
                icon: L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 29],
                    iconUrl: 'assets/marker-icon.png',
                    shadowUrl: 'assets/marker-shadow.png'
                })
            }).bindPopup(marker.label).addTo(this.map).on('click', function(e) {
            console.log(e);
        });
    }
}
