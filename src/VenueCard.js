import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
// Use library for expand/collapse on click
// There's a way to fire marker popup open events, but with vanilla JS
// the way to do it with React Leaftlet is much more involved
import Expand from 'react-expand-animated';

class VenueCard extends Component {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  render() {
    const venue = this.props.venue;
    const type = this.props.type;
    const imgData = this.props.imgData;
    const onVenueClick = this.props.onVenueClick;

    let img = null;
    if (type === 'popup' && venue.categories && venue.categories[0].icon) {
      img = <img className={'sidebar-img'} src={venue.categories[0].icon.prefix + 'bg_32' + venue.categories[0].icon.suffix} alt={'bubble tea icon'} />
    }
    else if (type === 'sidebar') {
      if (imgData && imgData.prefix && imgData.suffix) {
        img = <img className={'sidebar-img'} src={`${imgData.prefix}300x300${imgData.suffix}`} alt={'boba location'}/>
      }
      else {
        // There's no meaningful alt text to provide for a random or placeholder image
        img = <img className={'sidebar-img'} src={imgData} alt={''}/>
      }
    }

    return(
      <Fragment>
        <div className={type === 'sidebar' ? 'sidebar-venue-card' : 'popup-venue-card'} onClick={(event) => onVenueClick(event, venue.id)}>
        <h3 onClick={this.toggle}>{venue.name}</h3>
        <Expand open={type === 'sidebar' ? this.state.open : true}> 
          {img}
          {venue.location.formattedAddress.map((i, key) => {
            return <div key={key}>{i}</div>
          })}
        </Expand>
        </div>
      </Fragment>
    )
  }
}

VenueCard.propTypes = {
  venue: PropTypes.object
};

export default VenueCard;