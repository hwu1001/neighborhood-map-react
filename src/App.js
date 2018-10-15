import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Sidebar from 'react-sidebar';
import TitleBar from './TitleBar';
import VenueCard from './VenueCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [37.782230, -122.423750],
      venues: [], // array of objects from Foursquare API
      docked: false,
    };

    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
  }

  onSetOpen(open) {
    this.setState({ docked: open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.docked);
  }

  componentDidMount() {
    let apiUrl = 'https://api.foursquare.com/v2/venues/search?client_id=U1E3HY25OEO1J3WQFC4QZBA4NZNR44W1ELUPUJOC34DISYQI&client_secret=C4ADDKI4L2RP0AHEBV3YZNAXCGWOY4QYTBJTQQ4Y2EPFARLY&v=20180323&ll=37.782230,-122.423750&radius=4830&query=boba&categoryId=52e81612bcbc57f1066b7a0c'
    fetch(apiUrl)
      .then(response => {
        // console.log(response);
        response.json()
          .then(json => {
            // console.log(json);
            let venuesCopy = json.response.venues;
            // console.log(venuesCopy)
            // console.log(typeof venuesCopy)
            this.setState({ venues: venuesCopy });
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
        <span className={'title-bar-content'}>SF Bubble Tea</span>
      </span>
    );

    return (
      <div>
        <Sidebar
          sidebar={<div><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p><p>Sidebar content</p></div>}
          // open={this.state.open}
          onSetOpen={this.onSetOpen}
          styles={{
            sidebar: {
              background: "white" 
            },
            // overlay: {
            //   position: 'relative',
            //   backgroundColor: '',
            // }
          }}
          shadow={false}
          docked={this.state.docked}
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
              {this.state.venues.map((venue) => {
                return (
                  <Marker key={venue.id} position={[venue.location.lat, venue.location.lng]}>
                    <Popup>
                      <VenueCard venue={venue}/>
                    </Popup>
                  </Marker>
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
