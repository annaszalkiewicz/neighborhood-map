import React, { Component } from 'react';

class Sidebar extends Component {

	// handleClick = (marker) => {

	// 	console.log('I clicked list item!');

	// 	const { markers, infoWindow, map } = this.props;
	// 	let currentInfoWindow;
		
	// 	this.setState({infoWindow});

	// 	infoWindow.open(map, marker);
	// 	currentInfoWindow = infoWindow;
	// }

	render() {
		const { filterParks, filteredParks, markers, query } = this.props;

		return (
			<div className="sidebar-container" id="sidebar" onMouseUp={this.props.handleMouseUp}>
				<aside className="sidebar">
					<form className="form">
						<label htmlFor="locations-filter" className="label">Filter locations:</label>
						<input
							className="input"
							type="text"
							name="locations-filter"
							id="locations-filter"
							placeholder="Search locations"
							value={query}
							onChange={(event) => filterParks(event.target.value)}
						/>
					</form>
					<ul className="locations-list">

						{filteredParks.map((park) => (
							<li
								key={park.id}
								className="list-item"
								// onMouseUp={(event) => this.handleClick(event.target)}
							>
								<a href="javascript:window.google.maps.event.trigger(markers,'click');">{park.name}</a>
							</li>
						))}

						{(filteredParks.length === 0) &&
							<div>Sorry, we didn't find any park.</div>
						}
					</ul>
				</aside>
			</div>

		);
	}
}

export default Sidebar;