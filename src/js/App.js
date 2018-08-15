import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Footer from './Footer';
import '../css/App.css';
import '../css/responsive.css';

class App extends Component {

	render() {

		return (
			<div className="app">
				<a href="#menu" className="skip-link">Skip to content</a>
				<Header />
				<Map />
				<Footer />
			</div>
		);
	}
}

export default App;
