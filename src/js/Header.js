// eslint-disable-next-line
import React, { Component } from 'react';
import Tree from '../img/tree.svg';

const Header = (() => {
	return (
		<header className="header">
			<img src={Tree} alt="National Parks of Poland" className="logo"/>
			<h1 className="header-heading">
				National Parks of Poland
			</h1>
		</header>
	);
});
export default Header;