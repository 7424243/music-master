import React, {Component} from 'react';
import Artist from './Components/Artist';
import Search from './Components/Search';
import Tracks from './Components/Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class  App extends Component {

  //sets initial state
  state = {
    artist: null,
    tracks: []
  };

  //1st API fetch uses the artistQuery to find the artist's details and id
  //After refactoring for the Search component, this function now has an input of artistQuery
  searchArtist = (artistQuery) => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if(json.artists.total > 0) {
          const artist = json.artists.items[0];
          this.setState({artist: artist})

          //2nd API fetch uses the previous API fetch's results to fetch track data for this artist using their id.
          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              this.setState({tracks: json.tracks})
            })
            .catch((error) => {
              alert(error.message)
            });
        }
      })
      .catch((error) => {
        alert(error.message)
      });
  }



  //the Search component is passing a callback function through it's props in order for the Search component to update the state of App.
  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <Search searchArtist={this.searchArtist}/>
        <Artist artist={this.state.artist}/>
        <Tracks tracks={this.state.tracks}/>
      </div>
    );
  }

}

export default App;
