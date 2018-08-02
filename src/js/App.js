import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../css/App.css';

class App extends Component {

	componentDidMount = () => {
		window.initMap = this.initMap;
		// Asynchronously load the Google Maps script, passing in the callback reference
		this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDOCU_cQ_QOo17Gp9x5r2heeFNPR9KOZC4&callback=initMap')
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
			}
		];

		let map = new window.google.maps.Map( 
			document.getElementById('map'), {
				zoom: 6, 
				center: {lat: 51.7730971, lng: 19.4105533} ,
				styles: styles,
				mapTypeControl: false,
		});
	}
	render() {
		return (
			<main>
				<Header/>
				<div ref="map" id="map" className="map" role="application"></div>
				<Footer/>
			</main>
		);
	}
}

export default App;
