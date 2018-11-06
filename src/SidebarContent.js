import React, { Component } from 'react'
import PropTypes from "prop-types";
import VenueCard from './VenueCard';
const attribution = require('./powered-by-foursquare-blue.svg')

/**
* @description Represents the sidebar of the map
*/
class SidebarContent extends Component {
  state = {
    query: '',
  }

  /**
  * @description Handles when the query string is updated by the user
  * @param {string} query - The query string input by the user
  * @param {function} queryUpdateCb - Callback to be used to update state appropriately with the input query string
  * @return {undefined}
  */
  updateQuery = (query, queryUpdateCb) => {
    this.setState({ query: query });
    queryUpdateCb(query);
  }

  /**
  * @description Renders the sidebar
  * @returns {undefined}
  */
  render() {
    const {venues, imgData, onQueryUpdate, onVenueClick, collapsed} = this.props;
    const {query} = this.state;
    const onlineStatus = window.navigator.onLine ? null : <div aria-hidden={collapsed ? 'true' : 'false'} tabIndex={collapsed ? -1 : 0}>Some data may not be displayed while offline.</div>;
    return (
      // While the sidebar is hidden, make sure elements are not tab-able and are not read
      // since they do not appear on the screen
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
          <div aria-hidden={collapsed ? 'true' : 'false'} tabIndex={collapsed ? -1 : 0}>No results found.</div>
        )}
        {onlineStatus}
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
  venues: PropTypes.array,
  imgData: PropTypes.object,
  onQueryUpdate: PropTypes.func,
  collapsed: PropTypes.bool
};

export default SidebarContent;