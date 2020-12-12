import React, {Component} from 'react';

class Search extends Component {
    
    state = {artistQuery: ''};

    //updates state's artistQuery based on the value that is entered into the search
    updateArtistQuery = (event) => {
        this.setState({
        artistQuery: event.target.value
        });
    }

    //event handler for the search button
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        this.searchArtist();
        };
    }

    //This allows access to the callback function that was passed from App.js.
    searchArtist = () => {
        this.props.searchArtist(this.state.artistQuery);
    }

    render() {
        return (
            <div>
                <input 
                    onChange={this.updateArtistQuery}
                    onKeyPress={this.handleKeyPress}
                    placeholder='Search for an Artist' />
                <button onClick={this.searchArtist}>Search</button>
            </div>
        )
    }
}

export default Search;