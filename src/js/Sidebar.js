import React, { Component } from 'react';
import Modal from 'react-modal';

class Sidebar extends Component {

	constructor(props) {

		super(props);

		this.state = {
			modalIsOpen: false
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal = () => {

		Modal.setAppElement('#aside');
		this.setState({ modalIsOpen: true });

	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	}

	render() {
		const { filterParks, handleClick, filteredParks, query } = this.props;

		const { modalIsOpen } = this.state;

		return (

			<section id="aside">

				<button className="hamburger-button" onMouseUp={this.openModal}>
					<i className="material-icons hamburger-menu">menu</i>
				</button>

				<Modal
					isOpen={modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="onRequestClose Example"
					className="Modal-Sidebar"
					overlayClassName="Overlay-sidebar"
				>

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
									onClick={(e) => handleClick(e)}
									tabIndex="0"
									aria-label={park.name}
								>{park.name}</li>
							))}

							{(filteredParks.length === 0) &&
								<div>Sorry, we didn't find any park.</div>
							}
						</ul>
					</aside>
				</Modal >

			</section>

		);
	}
}

export default Sidebar;