import React, { Component } from 'react';
import { connect } from 'react-redux';

class Item extends Component {


  render() {
    const {location, showOnMap } = this.props;
    return (
        <li
         onClick={() => {
            this.props.mark(location.id);
            showOnMap(location);
            }
          }
            style={{
              textDecoration: location.visited ? 'line-through' : 'none'
            }}
          >
            {location.text}
          </li>
    );
  }
}

const mapStateToProps = state => {
  return { }
}

const mapDispatchToProps = dispatch => {
  return {
    mark: id => {
      dispatch({type: 'MARK', id: id});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Item);
