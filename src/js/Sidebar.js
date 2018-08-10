import React, { Component } from 'react';

class Sidebar extends Component {



	render() {
		const { filterParks, filteredParks, query } = this.props;

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
							>{park.name}</li>
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