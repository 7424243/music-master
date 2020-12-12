import React, {Component} from 'react';

class Tracks extends Component {

    //has it's own default state
    state = {playing: false, audio: null, playingPreviewUrl: null};

    //JavaScript audio object. The callback function has it's own callback function in order to control onClick
    playAudio = (previewUrl) => () => {
        const audio = new Audio(previewUrl);

        if (!this.state.playing) {
            audio.play();
            this.setState({playing: true, audio, playingPreviewUrl: previewUrl});
        } else {
            this.state.audio.pause();
            if (this.state.playingPreviewUrl === previewUrl) {
                this.setState({playing: false});
            } else {
                audio.play();
                this.setState({audio, playingPreviewUrl: previewUrl});
            }
            
        }
    }

    render() {

        //pulls tracks data from this.props passed from parent component
        const {tracks} = this.props;

        return (
            <div>
                {
                tracks.map(track => {
                    const {name, album, id, preview_url} = track;
                    return (
                        <div key={id} onClick={this.playAudio(preview_url)}>
                            <img src={album.images[0].url} alt='track'/>
                            <p>{name}</p>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Tracks;