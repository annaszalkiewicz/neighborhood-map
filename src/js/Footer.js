// eslint-disable-next-line
import React, { Component } from 'react';
import Tree from '../img/tree.svg';

const Footer = (() => {
	return (
		<footer className="footer">
			<img src={Tree} alt="Logo" className="logo-footer"/>
			<p className="copyright">
				Written and coded by 
				<a href="http://mywebgraphicdesign.com" target="_blank"> Anna Szalkiewicz</a>
			</p>
		</footer>
	);
});
export default Footer;