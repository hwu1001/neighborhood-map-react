import React from "react";
import PropTypes from "prop-types";

const VenueCard = (props) => {
  const venue = props.venue;
  return (
    <div>
      <h3>{venue.name}</h3>
      <img src={venue.categories[0].icon.prefix + 'bg_32' + venue.categories[0].icon.suffix} alt={'bubble tea icon'} />
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