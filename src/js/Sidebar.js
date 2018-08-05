import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class Sidebar extends Component {

	state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

	render() {
		const { parks } = this.props;
		const { query } = this.state

    let showingParks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingParks = parks.filter((park) => match.test(park.name))
    } else {
      showingParks = parks;
    }

    // showingContacts.sort(sortBy('name'))

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
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</form>
					<ul className="locations-list">
						{showingParks.map((park) => (
							<li key={park.id} className="list-item">{park.name}</li>
						))}
						{(showingParks.length === 0) &&
						<div>Sorry, we didn't find any park.</div>
						}
					</ul>
				</aside>
			</div>

		);
	}
}

export default Sidebar;