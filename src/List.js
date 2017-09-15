import React, { Component } from 'react';
import Item from './Item';

class List extends Component {


  render() {
    const {locations, showOnMap} = this.props
    return (
      <ol>
        { locations.map((location, i) => {
          return (
            <Item key={i} index={i} location={location} showOnMap={showOnMap}/>
          )
          })
        }
      </ol>
    );
  }
}

export default List;
