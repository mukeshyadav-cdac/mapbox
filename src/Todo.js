import React, { Component } from 'react';
import List from './List';
import { connect } from 'react-redux';

const filterResults = (locations, filter) => {
  switch (filter) {
    case 'ALL':
      return locations;
    case 'VISITED':
      return locations.filter(l => l.visited);
    case 'UNVISITED':
      return locations.filter(l => !l.visited);
    default:
      return locations;
  }
}

class Todo extends Component {

  render() {
    const {locations, showOnMap} = this.props;
    return (
      <div>
        <h1>List</h1>
        <button onClick={() => this.props.filter('ALL', locations) }>All</button>
        <button onClick={() => this.props.filter('VISITED', locations) }>Visited</button>
        <button onClick={() => this.props.filter('UNVISITED', locations) }>UnVisited</button>
        <List locations={locations} showOnMap={showOnMap}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: filterResults(state.locations, state.filter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filter: value => {
      dispatch({type: value});
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
