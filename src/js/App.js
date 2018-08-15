// eslint-disable-next-line
import React, { Component } from 'react';
// eslint-disable-next-line
import Header from './Header';
// eslint-disable-next-line
import Map from './Map';
// eslint-disable-next-line
import Footer from './Footer';
import '../css/App.css';
import '../css/responsive.css';

const App = (() => {

	return (
		<div className="app">
			<a href="#menu" className="skip-link">Skip to content</a>
			<Header />
			<Map />
			<Footer />
		</div>
	);

});

export default App;
