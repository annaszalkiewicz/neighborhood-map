import React, { Component } from 'react';
// import Modal from 'react-modal';
import parks from '../data/data.json';
import icon from '../img/marker.png';

class Map extends Component {

  constructor(props) {

    super(props);

    this.state = {
      map: '',
      markers: [],
      parks: parks,
      currentInfoWindow: null
      // modalIsOpen: false
    };
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    window.initMap = this.initMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDOCU_cQ_QOo17Gp9x5r2heeFNPR9KOZC4&callback=initMap');
  }

  loadJS = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
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
    this.setState({ map });
    this.addMarker();

    window.google.maps.event.addListenerOnce(map, 'idle', () => {
      document.getElementsByTagName('iframe')[0].title = 'Google  Maps';
    });

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

      // window.google.maps.event.addListener(marker, 'click', () => {this.openModal()});

      let content = `<div class="modal-container">${parks[i].name}</div>`;

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

  // openModal = () => {

  //   Modal.setAppElement('#root');
  //   this.setState({ modalIsOpen: true });
  // }

  // closeModal() {
  //   this.setState({ modalIsOpen: false });
  // }

  render() {
    let { parks } = this.state;

    return (
      <main>
        <div ref="map" id="map" className="map" role="application"></div>
        {/* <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="onRequestClose Example"
          className="Modal"
          overlayClassName="Overlay"
        >
          <button className="close-button" onClick={this.closeModal}>
            <i className="material-icons">close</i>
          </button>
          <div className="modal-container">
            {parks[i].name}
          </div>


        </Modal> */}
      </main>
    );
  }
}

export default Map;
