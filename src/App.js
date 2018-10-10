import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class App extends Component {
  state = {
    position: [37.782230, -122.423750],
    venues: [], // array of objects from Foursquare API
  }

  componentDidMount() {
    // 'https://api.foursquare.com/v2/venues/search?client_id=N1IAMKZUIK1AUHKRFGFBKPQ2YKDSBAKS4NTER5SYZN5CROR1&client_secret=4MKLXVLU2FGZQVRMAEDC15P0TFJGSCY3ZUYUZ0KHQQQLQ5R3&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
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
          this.setState({venues: venuesCopy});
        });
    })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const br = <br />;
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
      <div>
        <Map
          id="boba-map"
          center={this.state.position}
          zoom={14}>
          <TileLayer 
            url={"https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHl3dSIsImEiOiJjamxvdHUxd3QwMTJ4M2xrMHMxOGV2djNzIn0.k0k_pXFdtQ-_OeYtctQOFw"}
            attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
          />
          {this.state.venues.map((venue) => {
            return (
              <Marker key={venue.id} position={[venue.location.lat, venue.location.lng]}>
                <Popup>
                  {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                  <h3>{venue.name}</h3>
                  {venue.location.formattedAddress.map((i, key) => {
                    return <div key={key}>{i}</div>
                  })}
                </Popup>
              </Marker>
            )
          })}
        </Map>
      </div>
    );
  }
}

export default App;
