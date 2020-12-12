import React from 'react';

const Artist = (props) => {
    // if props.artist is falsey, don't show anything
    if (!props.artist) return null;

    //pulls out the values from props.artist. You need to know what you're data looks like at this point!
    const {images, name, followers, genres} = props.artist;

    return (
        <div>
            <h3>{name}</h3>
            <p>{followers.total} followers</p>
            <p>{genres.join(', ')}</p>
            <img 
                src={images[0] ? images[0].url : null} 
                alt='artist-profile'
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    objectFit: 'cover'
                }}/>
        </div>
    )
}

export default Artist;