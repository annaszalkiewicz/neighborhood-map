// eslint-disable-next-line
import React, { Component } from 'react';
import Tree from '../img/tree.svg';

const Header = (() => {
	return (
		<header className="header">
			<img src={Tree} alt="Logo" className="logo"/>
			<h1 className="header-heading">
				National Parks in Poland
			</h1>
			<button className="hamburger-button">
				<i className="material-icons hamburger-menu">menu</i>
			</button>
		</header>
	);
});
export default Header;