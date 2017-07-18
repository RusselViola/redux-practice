export let changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name: name
  }
};

export let addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby: hobby
  }
};

export let removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id: id
  }
};

export let addMovie = (title, genre) => {
  return {
    type: 'ADD_MOVIE',
    title: title,
    genre: genre
  }
}

export let removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id: id
  }
}

export let startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
};

export let completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
};

export let fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then(function(res) {
    let loc = res.data.loc;
    let baseUrl = 'http://maps.google.com?q='

    store.dispatch(completeLocationFetch(baseUrl + loc));
  })
};
