import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Footer from './Footer';
import '../css/App.css';

class App extends Component {

	render() {

		return (
			<div className="app">
				<Header />
				<Map />
				<Footer />
			</div>
		);
	}
}

export default App;
