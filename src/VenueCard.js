import React from "react";
import PropTypes from "prop-types";

const VenueCard = (props) => {
  const venue = props.venue;
  const type = props.type;
  const imgData = props.imgData;
  const onVenueClick = props.onVenueClick;

  let img = null;
  if (type === 'popup' && venue.categories && venue.categories[0].icon) {
    img = <img src={venue.categories[0].icon.prefix + 'bg_32' + venue.categories[0].icon.suffix} alt={'bubble tea icon'} />
  }
  else if (type === 'sidebar') {
    if (imgData && imgData.prefix && imgData.suffix) {
      img = <img src={`${imgData.prefix}300x300${imgData.suffix}`} alt={'boba location'}/>
    }
    else {
      // There's no meaningful alt text to provide for a random or placeholder image
      img = <img src={imgData} alt={''}/>
    }
  }

  return (
    <div onClick={(event) => onVenueClick(event, venue.id)}>
      <h3>{venue.name}</h3>
      {img}
      {venue.location.formattedAddress.map((i, key) => {
        return <div key={key}>{i}</div>
      })}
    </div>
  );
}

VenueCard.propTypes = {
  venue: PropTypes.object
};

export default VenueCard;