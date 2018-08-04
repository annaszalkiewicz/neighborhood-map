import React, { Component } from 'react';

class InfoWindow extends Component {

  closeInfoWindow = () => {
    this.setState({infoWindowIsOpen: false});
  }

  render() {
    return (
      <div className="info-window-container">
        <button>X</button>
        <p>This is info window.</p>
      </div>
    );
  }
}

export default InfoWindow;