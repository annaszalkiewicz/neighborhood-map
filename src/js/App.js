import React, { Component } from 'react';
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
		const centerMap = {lat: -25.344, lng: 131.036};

		let map = new window.google.maps.Map( 
			document.getElementById('map'), {
				zoom: 4, 
				center: centerMap
		});
		this.setState({map: map})
	}
	render() {
		return (
			<div ref="map" id="map" className="map" role="application"></div>
		);
	}
}

export default App;
