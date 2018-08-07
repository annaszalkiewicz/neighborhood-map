import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class Sidebar extends Component {

	state = {
		query: '',
		filteredParks: [],
		filteredMarkers: []
	}

	componentDidMount = () => {
		let { markers, parks } = this.props;
		let { filteredMarkers } = this.state;

		this.setState({filteredMarkers: markers, filteredParks: parks});

	}
	updateQuery = (query) => {

		this.setState({ query: query });
		this.filterParks(query);
  }

  clearQuery = () => {

		let { markers, parks } = this.props;

		this.setState({ query: '', filteredMarkers: markers, filteredParks: parks });

	}

	filterParks = (query) => {
		let  { markers, parks } = this.props;

		let filteredParks, filteredMarkers;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
			filteredParks = parks.filter((park) => match.test(park.name));

			filteredMarkers = markers.filter((marker) => match.test(marker.title));

			this.setState({filteredParks, filteredMarkers});

		} 
		
		else {
			this.setState({filteredParks: parks, filteredMarkers: markers});
		}

		this.showFilteredMarkers();

	}

	showFilteredMarkers = (marker) => {

		let { filteredMarkers } = this.state;

		filteredMarkers.map((filteredMarker) => {
			if (filteredMarker.title !== marker.name) {
				marker.setVisible(false)
			}  
		})			

	}

	render() {
		const { query, filteredParks } = this.state;

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
						{filteredParks.map((park) => (
							<li 
								key={park.id} 
								className="list-item"
								onClick={this.handleClick}
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