import React, { Component } from 'react'
import PropTypes from "prop-types";
import VenueCard from './VenueCard';
const attribution = require('./powered-by-foursquare-blue.svg')

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
    const {venues, imgData, onQueryUpdate, onVenueClick, collapsed} = this.props;
    const {query} = this.state;
  
    return (
      <div aria-hidden={collapsed ? 'true' : 'false'} tabIndex={collapsed ? -1 : 0} className={'sidebar-container'} aria-label={'Search for venues'}>
        <input 
          type='text'
          placeholder='Search for a venue'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value, onQueryUpdate)}
          aria-hidden={collapsed ? 'true' : 'false'} 
          // tabIndex={collapsed ? -1 : null}
        />
        {venues.length > 0 ? (
          venues.map((venue) => {
            return(<VenueCard key={venue.id} venue={venue} type={'sidebar'} imgData={imgData[venue.id]} onVenueClick={onVenueClick} collapsed={collapsed}/>)
          })
        ) : (
          <div>No results found.</div>
        )}
        <a 
          href={'https://foursquare.com/'} 
          target={'_blank'} 
          aria-hidden={collapsed ? 'true' : 'false'} 
          tabIndex={collapsed ? -1 : 0}>
          <img className={'fs-attribution'} src={attribution} alt={'Powered by Foursquare'}/>
        </a>
      </div>
    );
  }
}

SidebarContent.propTypes = {
  venues: PropTypes.array
};

export default SidebarContent;