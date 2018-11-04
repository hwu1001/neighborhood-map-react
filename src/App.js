import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup, Pane } from 'react-leaflet';
import Sidebar from 'react-sidebar';
import TitleBar from './TitleBar';
import VenueCard from './VenueCard';
import SidebarContent from './SidebarContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [37.782230, -122.423750],
      venues: [], // array of objects from Foursquare API
      filteredVenues: [],
      docked: true,
      venueImgData: {},
      venueClassList: {},
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  onSetOpen(open) {
    this.setState({ docked: open });
  }

  onQueryUpdate = (query) => {
    const queryLower = query.toLowerCase();
    if (queryLower.length === 0) {
      this.setState({ filteredVenues : this.state.venues });
    }
    else {
      const filteredTemp = this.state.venues.filter((venue) => venue.name.toLowerCase().includes(queryLower));
      this.setState({ filteredVenues : filteredTemp });
    }
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.docked);
  }

  onMarkerClick = (event, clickId = null) => {
    let clickedVenueId = null;
    if (clickId != null) {
      clickedVenueId = clickId;
    }
    else {
      const clsList = event.target.getElement().parentElement.classList;
      let clsId = null;
      for (let index = 0; index < clsList.length; index++) {
        if (clsList[index].includes('pane-pane')) {
          clsId = clsList[index];
        }
      }
      let splitStr = clsId.split('-');
      clickedVenueId = splitStr[1];
    }

    let temp = {};
    let venClassListCopy = {};
    for (const venueId of Object.keys(this.state.venueClassList)) {
      if (venueId === clickedVenueId) {
        venClassListCopy[venueId] = true;
      }
      else {
        venClassListCopy[venueId] = false;
      }
      temp[venueId] = false;
    }
    this.setState({ venueClassList: venClassListCopy }, () => {
      setTimeout(() => {
        this.setState({ venueClassList: temp });
      }, 1000);
    });
  }

  componentDidMount() {
    let apiUrl = 'https://api.foursquare.com/v2/venues/search?client_id=U1E3HY25OEO1J3WQFC4QZBA4NZNR44W1ELUPUJOC34DISYQI&client_secret=C4ADDKI4L2RP0AHEBV3YZNAXCGWOY4QYTBJTQQ4Y2EPFARLY&v=20180323&ll=37.782230,-122.423750&radius=4830&query=boba&categoryId=52e81612bcbc57f1066b7a0c'
    fetch(apiUrl)
      .then(response => {
        response.json()
          .then(json => {
            let venuesCopy = [];
            let imgDataCopy = {};
            let venClassListCopy = {};
            // let venuesCopy = json.response.venues;
            for (const venue of json.response.venues) {
              // If we don't have this data then there's nothing to show on the map
              if (venue.id && venue.name && venue.location && venue.location.lat && venue.location.lng) {
                venuesCopy.push(venue);
                venClassListCopy[venue.id] = false;
                // TODO - Put all this code into its own function
                // let imgApiUrl = `https://api.foursquare.com/v2/venues/${venue.id}/photos?client_id=U1E3HY25OEO1J3WQFC4QZBA4NZNR44W1ELUPUJOC34DISYQI&client_secret=C4ADDKI4L2RP0AHEBV3YZNAXCGWOY4QYTBJTQQ4Y2EPFARLY&v=20180323`
                // fetch(imgApiUrl)
                //   .then(res => {
                //     res.json()
                //       .then(imgJson => {
                //         // Loop over the images until a suitable one is found, then stop (we're only using one picture for now)
                //         if (Object.keys(imgJson.response).length > 0) {
                //           let found = false;
                //           for (const imgData of imgJson.response.photos.items) {
                //             if (imgData && imgData.prefix && imgData.suffix) {
                //               imgDataCopy[venue.id] = imgData;
                //               found = true;
                //               break;
                //             }
                //           }
                //           if (!found) {
                //             imgDataCopy[venue.id] = 'https://via.placeholder.com/300x300';                          
                //           }
                //         }
                        
                //       });
                //   })
                //   .catch(error => {
                //     console.log(error);
                //   });
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
            this.setState({ venueClassList: venClassListCopy });
            console.log('componentDidMount called');
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const contentHeader = (
      <span>
        <img
          id={'title-img'}
          onClick={this.menuButtonClick}
          title={(!this.state.docked ? 'Open sidebar' : 'Close sidebar')}
          className={'title-bar-content'}
          src={require("./tea_64px.png")}
          alt={""}
        />
        <span className={'title-bar-content'}>Tea Time</span>
      </span>
    );
    // https://www.npmjs.com/package/react-leaflet-sidetabs
    return (
      <div>
        <Sidebar
          sidebar={<SidebarContent venues={this.state.filteredVenues} imgData={this.state.venueImgData} onQueryUpdate={this.onQueryUpdate} onVenueClick={this.onMarkerClick}/>}
          // open={this.state.open}
          onSetOpen={this.onSetOpen}
          // styles={{
          //   sidebar: {
          //     background: "white",
          //     maxWidth: '280px',
          //     textAlign: 'center'
          //   },
          //   // overlay: {
          //   //   position: 'relative',
          //   //   backgroundColor: '',
          //   // }
          // }}
          shadow={false}
          docked={this.state.docked}
          pullRight={true}
        >
          <TitleBar title={contentHeader}>
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
                  <Pane key={`${venue.id}-anim`} name={`${venue.id}-pane`} className={this.state.venueClassList[venue.id] ? 'animated bounce' : 'no-click'}>
                    <Marker key={venue.id} position={[venue.location.lat, venue.location.lng]} onClick={(event) => this.onMarkerClick(event)}>
                      <Popup className={'foo bar'}>
                        <VenueCard venue={venue} type={'popup'} onVenueClick={this.onMarkerClick}/>
                      </Popup>
                    </Marker>
                  </Pane>
                )
              })}
            </Map>
          </TitleBar>
        </Sidebar>
      </div>
    );
  }
}

export default App;
