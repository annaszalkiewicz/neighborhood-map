import React, { Component } from 'react';

class Sidebar extends Component {

	render() {
		return (
			<aside className="sidebar">
				<form className="form">
					<label htmlFor="locations-filter" className="label">Filter locations:</label>
					<input 
						className="input" 
						type="text" 
						name="locations-filter" 
						id="locations-filter"
						placeholder="Search locations"
            // value={query}
            // onChange={(event) => this.updateQuery(event.target.value)}
						
					/>
				</form>
				<ul className="locations-list">
				
				</ul>
			</aside>
		);
	}
}

export default Sidebar;