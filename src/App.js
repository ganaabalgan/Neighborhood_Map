import React, { Component } from 'react';
import List from './List';
import Map from './Map';
import InfoWindow from './InfoWindow';
import './App.css';

const FOURSQUARE = require('react-foursquare')({
  clientID: 'LHV1G2LIUUEZZIG55P0BJPCYUJWVCOGDKMIW0GJASYVI3PLP',
  clientSecret: 'RJ5YCUR3BTDRY2Y2STTDNKFVGQWUKHPMYQWVOSE14FUN24EJ'
});

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }
  handleSetMarkers = (places) => {
    this.setState({ places });
  }
  handleHidingInfoWindow = () => {
    const places = this.state.places.map((p, index) => {
      p.clicked = false;
      return p;
    });
    this.setState({ places: places, selectedPlace: null });
  }
  // Returns foursquare response
  getInfo = (place) => {
    return FOURSQUARE.venues.getVenue({
      'venue_id': place.id
    })
  }
  showError = () => {
    const block = document.querySelector('.error');
    block.style.opacity = 1;
    setTimeout(() => {
      block.style.opacity = 0;
    }, 3000);
  }
  handleMarkerClick = (marker) => {
    const places = this.state.places.map((p, index) => {
      if (index === marker) {
        p.clicked = true;
      } else {
        p.clicked = false;
      }
      return p;
    });
    this.getInfo(this.state.places[marker])
      .then(fsResponse => {
        this.setState({
          places: places,
          selectedPlace: fsResponse.response.venue
        });
        document.querySelector('.informationWindow').focus();
      })
      .catch(error => {
        this.showError();
        console.log(error);
      });
  }

  render() {
    const placesInfo = this.state.places.map(v => {
      return { lat: v.location.lat, lng: v.location.lng, clicked: v.clicked }
    });

    return (
      <div className='appContainer'>
        <List
          foursquare={FOURSQUARE}
          setMarkers={this.handleSetMarkers}
          onPlaceClick={this.handleMarkerClick}
        />
        <Map
          places={placesInfo}
          hideInfoWindow={this.handleHidingInfoWindow}
          onMarkerClick={this.handleMarkerClick}
          onError={this.showError}
        />
        {this.state.selectedPlace && (
          <InfoWindow
            place={this.state.selectedPlace}
            foursquare={FOURSQUARE}
            hideInfoWindow={this.handleHidingInfoWindow}
          />
        )}
        <div
          style={{ opacity: 0 }}
          className='error'>Something went wrong
        </div>
      </div>
    );
  }
}

export default App;