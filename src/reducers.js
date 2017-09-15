let nextId = 0

const defaultState = {
  filter: 'ALL',
  locations: []
}



const todos = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [
          ...state.locations, {
            id: nextId++,
            text: action.input,
            lat: action.lat,
            lng: action.lng,
            visited:  false
          }
        ]
      }
    case 'MARK':
      return {
        ...state,
        locations: state.locations.map(location =>
        (location.id === action.id)
          ? {...location, visited: !location.visited}
          : location
        )
      }
    case 'ALL':
      return {
        ...state,
        filter: 'ALL'
      }
    case 'VISITED':
      return {
        ...state,
        filter: 'VISITED'
      }
    case 'UNVISITED':
      return {
        ...state,
        filter: 'UNVISITED'
      }
    default:
      return state
  }

}

export default todos;
