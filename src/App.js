import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, TileLayer } from 'react-leaflet';

class App extends Component {
  render() {
    const position = [37.782230, -122.423750];
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
          center={position}
          zoom={14}>
          <TileLayer 
            url={"https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHl3dSIsImEiOiJjamxvdHUxd3QwMTJ4M2xrMHMxOGV2djNzIn0.k0k_pXFdtQ-_OeYtctQOFw"}
            attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
          />
        </Map>
      </div>
    );
  }
}

export default App;
