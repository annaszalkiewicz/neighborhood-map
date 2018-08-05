import React, { Component } from 'react';

class HamburgerButton extends Component {

	render() {

		return (
			<button 
				className="hamburger-button"
				onMouseUp={this.props.handleMouseUp}
			>
				<i className="material-icons hamburger-menu">menu</i>
			</button>
		);
	}
}
export default HamburgerButton;