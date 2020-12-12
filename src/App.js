import React, {Component} from 'react';
import Artist from './Components/Artist';
import Tracks from './Components/Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class  App extends Component {

  //sets initial state
  state = {
    artistQuery: '',
    artist: null,
    tracks: []
  };

  //updates state's artistQuery based on the value that is entered into the search
  updateArtistQuery = (event) => {
    this.setState({
      artistQuery: event.target.value
    });
  }

  //1st API fetch uses the artistQuery to find the artist's details and id
  searchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
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

  //event handler for the search button
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchArtist();
    }
  }


  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <input 
          onChange={this.updateArtistQuery}
          onKeyPress={this.handleKeyPress}
          placeholder='Search for an Artist' />
        <button onClick={this.searchArtist}>Search</button>
        <Artist artist={this.state.artist}/>
        <Tracks tracks={this.state.tracks}/>
      </div>
    );
  }

}

export default App;
