import React, { Component } from 'react'
import PropTypes from "prop-types";
import VenueCard from './VenueCard';

class SidebarContent extends Component {
  state = {
    query: '',
  }

  // For search just use a simple Regex.test or indexOf
  // https://koukia.ca/top-6-ways-to-search-for-a-string-in-javascript-and-performance-benchmarks-ce3e9b81ad31

  /**
  * @description Handles when the query string is updated by the user
  * @param {string} query - The query string input by the user
  * @return {undefined}
  */
  updateQuery = (query, queryUpdateCb) => {
    this.setState({ query: query });
    console.log(query);
    queryUpdateCb(query);
  }

  render() {
    const {venues, imgData, onQueryUpdate, onVenueClick} = this.props;
    const {query} = this.state;
  
    return (
      <div>
        <input 
          type='text'
          placeholder='Search for a venue'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value, onQueryUpdate)}
        />
        {venues.length > 0 ? (
          venues.map((venue) => {
            return(<VenueCard key={venue.id} venue={venue} type={'sidebar'} imgData={imgData[venue.id]} onVenueClick={onVenueClick}/>)
          })
        ) : (
          <div>No results found.</div>
        )}
      </div>
    );
  }
}

SidebarContent.propTypes = {
  venues: PropTypes.array
};

export default SidebarContent;