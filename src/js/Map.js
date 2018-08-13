import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Modal from 'react-modal';
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
      query: '',
      filteredMarkers: [],
      filteredParks: [],
      infoWindow: {},
      modalIsOpen: false
    };
    this.fetchImages = this.fetchImages.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.filterParks = this.filterParks.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {

    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAf26YXhGHSk1MxVmC2BfMTG5EJp5gHUrA&callback=initMap');

    //Create map on load
    window.initMap = this.initMap;

    // Show all parks listed by default
    let { markers, parks } = this.state;

    this.setState({ filteredMarkers: markers, filteredParks: parks });

  }

  loadJS = (src) => {
    const ref = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
  }

  openModal = () => {
    this.fetchImages();

    Modal.setAppElement('#root');
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  fetchImages = () => {

    const key = '060c74d545a11b19611116873f118dba';
    let tags = this.state.currentPark.name;
    const { currentPark } = this.state;

    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${tags}&tag_mode=all&content_type=1&sort=interestingness-desc&per_page=5&page=1&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then((j) => {

        let pics = j.photos.photo.map((pic) => {

          let url = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
          return (
            <a href={url} target="_blank" key={pic.id}>
              <img key={pic.id} src={url} className="gallery-image" alt={tags} />
            </a>

          )
        })

        this.setState({ images: pics, galleryIsOpen: true });

      })
      .catch(e => this.requestError(e, 'image'));

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

        this.setState({ infoWindow, currentPark: parks[i] })

        this.closeModal();

        this.openModal();

        if (currentInfoWindow !== null) {
          currentInfoWindow.close(map, this);
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;

      });

    }
  }

  handleClick = (e) => {

    const { markers } = this.state;
    e.preventDefault();

    // When click on list item on sidebar, map over all markers to find the corresponding one and force to click it that results in opening info window 

    markers.map((marker) => {
      if (marker.title === e.target.innerHTML) {
        return window.google.maps.event.trigger(marker, 'click');
      }
    })

  }

  toggleSidebar = () => {

    const sidebar = document.getElementById('sidebar');
    (sidebar.classList.contains('show') ?
      sidebar.classList.remove('show') :
      sidebar.classList.add('show'))

  }

  handleMouseUp(e) {
    this.toggleSidebar();

    e.stopPropagation();
  }

  filterParks = (query) => {
    let { markers, parks, map } = this.state;

    let filteredParks, filteredMarkers;

    // Show all parks markers by default
    markers.map((marker) => {
      marker.setMap(map)
    })

    if (query) {

      this.setState({ query: query });

      const match = new RegExp(escapeRegExp(query), 'i')

      // Is search query match park name, add park to filteredParks array
      filteredParks = parks.filter((park) => match.test(park.name));

      // Add markers to filteredMarkers array that don't match their park name with marker title
      filteredMarkers = markers.filter((marker) => filteredParks.every((park) => park.name !== marker.title));

      // Hide markers that are included in filteredMarkers array
      filteredMarkers.map((filteredMarker) => {
        filteredMarker.setMap(null)
      })

      // Sort search result by name
      filteredParks.sort(sortBy('name'));

      this.setState({ filteredParks: filteredParks, filteredMarkers: filteredMarkers });

    }

    // If there is no query, show all markers

    else {
      this.setState({ query: '', filteredMarkers: markers, filteredParks: parks });

      markers.map((marker) => {
        marker.setMap(map)
      })
    }

  }

  render() {

    let { markers, map, parks, filteredMarkers, filteredParks, query, infoWindow, images, modalIsOpen } = this.state;

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
          filterMarkers={this.filterMarkers}
          filterParks={this.filterParks}
          filteredMarkers={filteredMarkers}
          filteredParks={filteredParks}
          updateQuery={this.updateQuery}
          query={query}
          infoWindow={infoWindow}
          handleClick={this.handleClick}
        />

        {images.length !== 0 && (
          <Modal
            isOpen={modalIsOpen}
            // onRequestClose={this.closeModal}
            contentLabel="onRequestClose Example"
            className="Modal"
            overlayClassName="Overlay"
          >
            <button className="close-button" onClick={this.closeModal}>
              <i className="material-icons">close</i>
            </button>

            <div className="gallery">{images}</div>
            <div className="powered-by">Powered by
            <a href="https://flickr.com">Flickr</a>
            </div>

          </Modal>
        )}

        {images.length === 0 && (
          <div className="no-found">
            Sorry, we didn't find any image.
					</div>
        )}

      </main>
    );
  }
}

export default Map;
