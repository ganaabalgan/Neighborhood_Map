import React, { Component } from 'react';
import Draggable from 'react-draggable';

class InfoWindow extends Component {
  render() {
    const { place } = this.props;

    return (
    <Draggable>
      <article className='informationWindow' role='article' tabIndex='1'>
        <h2 className='informationName'>{place.name}</h2>
        <p
          onClick={() => {this.props.hideInfoWindow()}}
          className='closeWindow'>X</p>
        <p className='informationCategory'>{place.categories[0].name}</p>
        <p className='informationAddress'>{place.location.address}, {place.location.city}</p>
        <p className='informationRating'>Rating: {place.rating} ({place.likes.summary})</p>
        {place.bestPhoto && (
          <img
            arial-label={place.name}
            alt={place.name}
            src={`${place.bestPhoto.prefix}300x200${place.bestPhoto.suffix}`}
            onDragStart={event => event.preventDefault()}>
          </img>
        )}
      </article>
    </Draggable>
    )
  }
}

export default InfoWindow;