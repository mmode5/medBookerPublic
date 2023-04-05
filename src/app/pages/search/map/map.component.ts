import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private _map: google.maps.Map | undefined;
  constructor() {}
  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyBz_xKuTdpoDn3Ug8KHBszYUDbN2m9fMfg',
    });

    loader.load().then(() => {
      this._map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: { lat: 41.71667, lng: 44.28333 },
          zoom: 7,
          mapTypeId: 'hybrid',
          heading: 90,
          tilt: 45,
        }
      );
      const markers = [
        {
          lat: 41.6168,
          lng: 41.6367,
          title: 'Batumi',
        },
        {
          lat: 41.6938,
          lng: 44.8015,
          title: 'Tbilisi',
        },
        {
          lat: 42.0757,
          lng: 43.954,
          title: 'Shida Kartli',
        },
        {
          lat: 42.7352,
          lng: 42.1689,
          title: 'Samegrelo',
        },
        {
          lat: 41.6482,
          lng: 45.6906,
          title: 'Kakheti',
        },
      ];

      markers.forEach((x) => {
        new google.maps.Marker({
          position: x,
          map: this._map,
          title: x.title,
        });
      });
    });
  }
}
