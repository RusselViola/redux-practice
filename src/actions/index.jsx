let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name: name
  }
};

let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby: hobby
  }
};

let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id: id
  }
};

let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title: title,
    genre: genre
  }
}

let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id: id
  }
}

let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
};

let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res) {
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};
