import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import parks from '../data/data.json';
import icon from '../img/marker.png';
import staticMap from '../img/static-map.jpg';

class Map extends Component {

	constructor(props) {

		super(props);

		this.state = {
			map: '',
			markers: [],
			parks: parks,
			images: [],
			currentPark: {},
			query: '',
			filteredMarkers: [],
			filteredParks: [],
			modalIsOpen: false,
			error: false
		};
		this.fetchImages = this.fetchImages.bind(this);
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

		// Error handling when there is problem with Google map authorization 
		window.gm_authFailure = () => {
			alert('Sorry, there was problem while loading map. Please check your API key.')
		}

	}

	loadJS = (src) => {
		// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
		const ref = window.document.getElementsByTagName("script")[0];
		const script = window.document.createElement("script");
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
	}

	openModal = () => {

		// Method that fetch images and opens modal

		this.fetchImages();

		Modal.setAppElement('#root');
		this.setState({ modalIsOpen: true });

	}

	closeModal = () => {

		// Method that closes modal
		this.setState({ modalIsOpen: false });
	}

	fetchImages = () => {

		// Fetch images from flicks. If fetch is successfull - create image thumbnails, if not - manage error handling

		const key = '060c74d545a11b19611116873f118dba';
		let tags = this.state.currentPark.name;

		fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${tags}&tag_mode=all&sort=interestingness-desc&per_page=6&page=1&format=json&nojsoncallback=1`)
			.then(response => response.json())
			.then((j) => {

				let pics = j.photos.photo.map((pic) => {

					let url = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
					return (
						<div className="image-container" key={pic.id}>
							<a href={url} target="_blank" rel="noopener noreferrer" tabIndex="-1">
								<img key={pic.id} src={url} className="gallery-image" alt={tags} tabIndex="0" aria-label={tags} />
							</a>
						</div>
					)
				})

				this.setState({ images: pics });

			})
			.catch((error) => {

				this.setState({ error: true })

			});

	}

	requestError = (e) => {
		console.log(e);

	}

	initMap = () => {

		// This method creates Google map with custom map styles, add title to iframe for better accessibility and call addMarker()

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
		// Create google map only if there is internet connection

		if (navigator.onLine) {
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

			// Construct the circle for each value in parks.
			// Note: We scale the area of the circle based on the area.
			for (let park in parks) {
				// Add the circle for this city to the map.
				const parkCircle = new window.google.maps.Circle({
					strokeColor: '#000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '47ff0d',
					fillOpacity: 0.35,
					map: map,
					center: parks[park].latlng,
					radius: Math.sqrt(parks[park].area) * 1000
				});
			}

			window.google.maps.event.addListenerOnce(map, 'idle', () => {
				document.getElementsByTagName('iframe')[0].title = 'Google  Maps';
			});

			window.gm_authfailure = () => {
				alert('Error occured with authentication while loading map. Please check your API key');
			}
			this.addMarker();
		}
		else {

			// If internet is not available, use static map image.

			const map = document.getElementById('map');
			const staticImg = document.createElement('img');
			map.appendChild(staticMap);
			staticImg.classList.add('offline-map');
			staticImg.setAttribute('src', staticMap);
			staticImg.setAttribute('alt', 'static map');
		}

	}

	addMarker = () => {

		//  Creates markers for all locations on map

		let { markers, map, parks } = this.state;

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

			this.showListings();

			// Event listener on marker click. It animates marker and opens modal

			marker.addListener('click', () => {

				marker.setAnimation(window.google.maps.Animation.BOUNCE);
				// Add animation to marker on click
				setTimeout(() => {
					marker.setAnimation(null);
				}, 2000);

				this.setState({ currentPark: parks[i] });

				setTimeout(() => { this.openModal(); }, 600);

			});

		}
	}

	showListings = () => {

		// This method will loop through the markers array and display them all.

		const { markers, map } = this.state;

		const bounds = new window.google.maps.LatLngBounds();
		// Extend the boundaries of the map for each marker and display the marker
		for (let i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
			bounds.extend(markers[i].position);
		}
		map.fitBounds(bounds);
	}

	handleClick = (e) => {

		const { markers } = this.state;
		e.preventDefault();

		// When click on list item on sidebar, map over all markers to find the corresponding one and force to click it that results in opening info window 

		markers.map((marker) => {

			if (marker.title === e.target.innerHTML) {
				this.closeModal();
				window.google.maps.event.trigger(marker, 'click');
			}
		})

	}

	filterParks = (query) => {

		// This method filter locations depending on query input 

		let { markers, parks, map } = this.state;

		let filteredParks, filteredMarkers;

		// Show all parks markers by default
		markers.map((marker) => {
			return marker.setMap(map)
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
				return filteredMarker.setMap(null)
			})

			// Sort search result by name
			filteredParks.sort(sortBy('name'));

			return this.setState({ filteredParks: filteredParks, filteredMarkers: filteredMarkers });

		}

		// If there is no query, show all markers

		else {
			this.setState({ query: '', filteredMarkers: markers, filteredParks: parks });

			markers.map((marker) => {
				return marker.setMap(map)
			})
		}

	}

	render() {

		let { markers, map, parks, filteredMarkers, filteredParks, query, infoWindow, images, modalIsOpen, currentPark, error } = this.state;

		return (

			<main>
				<div ref="map" id="map" className="map" role="application"></div>

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

				<Modal
					isOpen={modalIsOpen}
					onRequestClose={this.closeModal}
					role="dialog"
					contentLabel="Park's details page"
					className="Modal"
					overlayClassName="Overlay"
				>
					<button className="close-button" onClick={this.closeModal}>
						<i className="material-icons">close</i>
					</button>

					<h2 className="modal-heading">{currentPark.name}</h2>
					<section className="info-container">
						<table>
							<tbody>
								<tr>
									<td className="info-heading">Origin:</td>
									<td className="info-details">{currentPark.origin}</td>
								</tr>
								<tr>
									<td className="info-heading">Seat:</td>
									<td className="info-details">{currentPark.seat}</td>
								</tr>
								<tr>
									<td className="info-heading">Telephone:</td>
									<td className="info-details">{currentPark.telephone}</td>
								</tr>
								<tr>
									<td className="info-heading">Website:</td>
									<td className="info-details"><a href={currentPark.url} className="park-link" target="_blank" rel="noopener noreferrer">{currentPark.url}</a></td>
								</tr>
								<tr>
									<td className="info-heading">Area:</td>
									<td className="info-details">{currentPark.area} km&sup2;</td>
								</tr>
								<tr>
									<td className="info-heading">Established:</td>
									<td className="info-details">{currentPark.year} year</td>
								</tr>
							</tbody>
						</table>
					</section>

					<div className="gallery">{images}</div>

					{images.length === 0 && !error && (
						<div className="no-found">
							Sorry, we didn't find any image.
							</div>
					)}

					{error && (
						<div className="no-found">
							Sorry, there was a problem with fetching images.
							</div>
					)}

					<div className="powered-by">Photo gallery powered by <a href="https://flickr.com" className="flickr" target="_blank" rel="noopener noreferrer"> Flickr</a>
					</div>

				</Modal>

			</main >
		);
	}
}

export default Map;
