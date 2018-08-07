import React, { Component } from 'react';
import Sidebar from './Sidebar';
import parks from '../data/data.json';
import icon from '../img/marker.png';

class Map extends Component {

  constructor(props) {

    super(props);

    this.state = {
      map: '',
      markers: [],
      parks: parks,
      currentInfoWindow: null,
      images: [],
      currentPark: {},
      filteredMarkers: []
    };
    this.fetchImages = this.fetchImages.bind(this);
    this.addImages = this.addImages.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount = () => {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAf26YXhGHSk1MxVmC2BfMTG5EJp5gHUrA&callback=initMap');
    this.fetchImages();
  }

  loadJS = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  fetchImages = () => {

    const key = '060c74d545a11b19611116873f118dba';
    let { currentPark } = this.state;

    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${currentPark.name}&per_page=5&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((j) => this.addImages())
      .catch(e => this.requestError(e, 'image'));

  }

  addImages = (j) => {

    let images = j.photos.photo.map((pic) => {

      let path = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
      return (
        <img alt="National Parks of Poland" src={path}></img>
      )
    })
    this.setState({ images: images });

    console.log('Success!');

  }

  requestError = (e) => {
    console.log(e);

  }

  initMap = () => {

    const styles = [
      {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {
            "hue": "#1E4C40"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -70
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "saturation": -60
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "off"
          },
        ]
      }
    ];

    let map = new window.google.maps.Map(
      document.getElementById('map'), {
        zoom: 6,
        center: { lat: 51.7730971, lng: 19.4105533 },
        styles: styles,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER
        },
      });
    this.setState({ map: map });

    window.google.maps.event.addListenerOnce(map, 'idle', () => {
      document.getElementsByTagName('iframe')[0].title = 'Google  Maps';
    });

    this.addMarker();

  }

  addMarker = () => {
    let { markers, map, parks, currentInfoWindow } = this.state;

    for (let i = 0; i < parks.length; i++) {
      // Get the position from the location array.
      let position = parks[i].latlng;
      let title = parks[i].name;

      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: parks.id,
        icon: icon
      });
      // Push the marker to our array of markers.
      markers.push(marker);

      let content = `
      <h2 class="info-heading">${parks[i].name}</h2>
      <div class="info-container">
        <table>
          <tbody>
            <tr>
              <td class="info-heading">Origin:</td>
              <td class="info-details">${parks[i].origin}</td>
            </tr>
            <tr>
              <td class="info-heading">Seat:</td>
              <td class="info-details">${parks[i].seat}</td>
            </tr>
            <tr>
              <td class="info-heading">Telephone:</td>
              <td class="info-details">${parks[i].telephone}</td>
            </tr>
            <tr>
              <td class="info-heading">Website:</td>
              <td class="info-details"><a href=${parks[i].url}>${parks[i].url}</a></td>
            </tr>
            <tr>
              <td class="info-heading">Area:</td>
              <td class="info-details">${parks[i].area} km&sup2;</td>
            </tr>
            <tr>
              <td class="info-heading">Established:</td>
              <td class="info-details">${parks[i].year} year</td>
            </tr>
          </tbody>
        </table>      
      </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: content
      });

      marker.addListener('click', () => {

        if (currentInfoWindow !== null) {
          currentInfoWindow.close(map, this);
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });

    }
  }

  toggleSidebar = () => {

    const sidebar = document.getElementById('sidebar');
    (sidebar.classList.contains('show') ?
    sidebar.classList.remove('show') :
    sidebar.classList.add('show'))

  }

  handleMouseUp(e) {
    this.toggleSidebar();
 
    console.log("clicked");
    e.stopPropagation();
  }

  render() {

    let { markers, map, parks } = this.state;

    return (
      <main>
        <div ref="map" id="map" className="map" role="application"></div>
        <button 
				className="hamburger-button"
				onMouseUp={this.handleMouseUp}
			>
				<i className="material-icons hamburger-menu">menu</i>
			</button>
        <Sidebar
          parks={parks}
          toggleSidebar={this.toggleSidebar}
          markers={markers}
          map={map}
        />
        <div className="gallery"></div>
      </main>
    );
  }
}

export default Map;
