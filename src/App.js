import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup, Pane } from 'react-leaflet';
import { Sidebar, Tab } from 'react-leaflet-sidetabs'
import VenueCard from './VenueCard';
import SidebarContent from './SidebarContent';
import { FiChevronRight, FiSearch } from "react-icons/fi";
import * as utils from './utils';

/**
* @description Represents the single page application of the map holding venues
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [37.782230, -122.423750], // Right around Jefferson Square Park in SF
      venues: [], // array of objects from Foursquare API
      filteredVenues: [],
      venueImgData: {},
      venueClicked: {}, // manage the whether a venue is clicked or not
      collapsed: true,
      selected: 'search'
    };

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  /**
  * @description Handles sidebar state when it is closed
  * @returns {undefined}
  */
  onClose() {
    this.setState({ collapsed: true });
  }

  /**
  * @description Handles sidebar state when a tab is opened
  * @param {string} id - The id of a sidebar tab
  * @returns {undefined}
  */
  onOpen(id) {
    this.setState({
      collapsed: false,
      selected: id,
    });
  }

  /**
  * @description Handles updating the filtered venue state when a user searches for venues
  * @param {string} query - User input query string
  * @returns {undefined}
  */
  onQueryUpdate = (query) => {
    // For search just use a simple solution
    // https://koukia.ca/top-6-ways-to-search-for-a-string-in-javascript-and-performance-benchmarks-ce3e9b81ad31
    const queryLower = query.toLowerCase();
    if (queryLower.length === 0) {
      this.setState({ filteredVenues: this.state.venues });
    }
    else {
      const filteredTemp = this.state.venues.filter((venue) => venue.name.toLowerCase().includes(queryLower));
      this.setState({ filteredVenues: filteredTemp });
    }
  }

  /**
  * @description Handles when a marker or venue card is clicked
  * @param {SyntheticEvent} event - One of the designated shelf types ('read', 'wantToRead', 'currentlyReading') - note: not currently used
  * @param {string} clickId - The identifier given by the API for the clicked venue
  * @returns {undefined}
  */
  onMarkerClick = (event, clickId = null) => {
    let clickedVenueId = clickId;
    if (clickId === null) {
      return;
    }

    let temp = {};
    let venClickedCopy = {};
    for (const venueId of Object.keys(this.state.venueClicked)) {
      if (venueId === clickedVenueId) {
        venClickedCopy[venueId] = true;
      }
      else {
        venClickedCopy[venueId] = false;
      }
      temp[venueId] = false;
    }
    // Remove the classes on the Pane components so that the animation can
    // appear on the next click
    this.setState({ venueClicked: venClickedCopy }, () => {
      setTimeout(() => {
        this.setState({ venueClicked: temp });
      }, 1000);
    });
  }

  /**
  * @description Sets state when the Map app mounts on the page
  * @returns {undefined}
  */
  componentDidMount() {
    let apiUrl = 'https://api.foursquare.com/v2/venues/search?client_id=U1E3HY25OEO1J3WQFC4QZBA4NZNR44W1ELUPUJOC34DISYQI&client_secret=C4ADDKI4L2RP0AHEBV3YZNAXCGWOY4QYTBJTQQ4Y2EPFARLY&v=20180323&ll=37.782230,-122.423750&radius=4830&query=boba&categoryId=52e81612bcbc57f1066b7a0c'
    let venuePromise = utils.fetchVenues(apiUrl);
    venuePromise
      .then(venues => {
        let venuesCopy = [];
        let imgDataCopy = {};
        let venClickedCopy = {};
        for (const venue of venues) {
          if (venue.id && venue.name && venue.location && venue.location.lat && venue.location.lng) {
            venuesCopy.push(venue);
            venClickedCopy[venue.id] = false;
            if (!imgDataCopy[venue.id]) {
              // Use a placeholder on error retrieving photos (just a random one for now since I can only get one picture per day with Foursquare)
              // Need to add a unique piece of data to the URL so that browser doesn't cache the same random image, see:
              // https://github.com/unsplash/unsplash-source-js/issues/9
              imgDataCopy[venue.id] = `https://picsum.photos/300/?random/${venue.id}`; // 'https://via.placeholder.com/300x300';
            }
          }
        }
        this.setState({ venues: venuesCopy });
        this.setState({ filteredVenues: venuesCopy });
        this.setState({ venueImgData: imgDataCopy });
        this.setState({ venueClicked: venClickedCopy });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
  * @description Renders the Map app component
  * @returns {undefined}
  */
  render() {
    return (
      <div>        
        <Sidebar
          id='sidebar'
          position='right'
          collapsed={this.state.collapsed}
          closeIcon={<FiChevronRight />}
          selected={this.state.selected}
          onClose={this.onClose}
          onOpen={this.onOpen}
        >
          <Tab id='search' header='Tea Time' tabIndex={0} icon={<FiSearch />}>
            <SidebarContent
              venues={this.state.filteredVenues}
              imgData={this.state.venueImgData}
              onQueryUpdate={this.onQueryUpdate}
              onVenueClick={this.onMarkerClick}
              collapsed={this.state.collapsed}
            />
          </Tab>
        </Sidebar>
        <Map
          id="boba-map"
          center={this.state.position}
          zoom={14}>
          <TileLayer
            url={"https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHl3dSIsImEiOiJjamxvdHUxd3QwMTJ4M2xrMHMxOGV2djNzIn0.k0k_pXFdtQ-_OeYtctQOFw"}
            attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
              '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>' +
              '<div>Title icon made by <a href="https://www.flaticon.com/authors/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>'}
          />
          {this.state.filteredVenues.map((venue) => {
            return (
              <Pane
                key={`${venue.id}-anim`}
                name={`${venue.id}-pane`}
                className={this.state.venueClicked[venue.id] ? 'animated bounce' : 'no-click'}
              >
                <Marker
                  key={venue.id}
                  position={[venue.location.lat, venue.location.lng]}
                  onClick={(event) => this.onMarkerClick(event, venue.id)}
                  title={venue.name}
                  alt={venue.name}
                >
                  <Popup>
                    <VenueCard
                      venue={venue}
                      type={'popup'}
                      imgData={this.state.venueImgData[venue.id]}
                      onVenueClick={this.onMarkerClick}
                      collapsed={this.state.collapsed}
                    />
                  </Popup>
                </Marker>
              </Pane>
            )
          })}
        </Map>
      </div>
    );
  }
}

export default App;
