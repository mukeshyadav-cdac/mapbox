import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import './App.css';
import Todo from './Todo';
import config from './config';
import { connect } from 'react-redux';

const L = window.L;
L.mapbox.accessToken = config.map_key;

class App extends Component {

  constructor(props) {
    super(props);
    this.renderPop = this.renderPop.bind(this);
    this.loctionEntry = {
      input: "",
      lat: "",
      lng: ""
    };
  }

  removeEvent () {
    let element = window.document.getElementById('map-form');
      if ( element) {
        window.document.getElementById('map-submit').onclick =null;
        element.parentNode.removeChild(element);
      }
  }

  showOnMap(data) {
    window.L.marker([data.lat, data.lng], {
        icon: L.mapbox.marker.icon({
            'marker-size': 'large',
            'marker-color': '#fa0'
        })
    }).addTo(this.map);
  }

  componentDidMount () {
    this.map = L.mapbox.map('map', 'mapbox.streets').setView([40, -74.50], 9);
    this.map.on('click', e => {
      let element = window.document.getElementById('map-form');
      if ( element) {
        window.document.getElementById('map-submit').onclick =null;
        element.parentNode.removeChild(element);
      }
      this.loctionEntry.lat = e.latlng.lat;
      this.loctionEntry.lng = e.latlng.lng;
      this.popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(ReactDOMServer.renderToString(this.renderPop()))
        .openOn(this.map);
        window.document.getElementById('map-submit').onclick = () => {
          this.props.addLocation(this.loctionEntry);
        }

    });

  }


  renderPop () {
    return (
      <div id="map-form">
        <input type="text" id="map-text"/>
        <input type="button" id="map-submit"  value="Submit" />
      </div>
    )
  }

  handleChange (event) {
    this.loctionEntry.input = event.target.value;
  }

  render() {
    const {locations} = this.props;
    return (
      <div>
        <div className="map-container">
          <div id='map'></div>
        </div>
        <div className="todo-container">
          <Todo locations={locations} showOnMap={this.showOnMap.bind(this)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLocation: loctionEntry => {
      loctionEntry.input = window.document.getElementById('map-text').value;
      dispatch({
        type: 'ADD_LOCATION',
        ...loctionEntry
      });

      let element = window.document.getElementsByClassName('leaflet-popup-close-button')
      if (element && element[0]) {
        element[0].click();
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
