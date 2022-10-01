const clientId = 'ff90f41cfa5c4c0ebc1e2b3c831e44c2';
const redirectUri = 'http://localhost:3000/'
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        { headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));
    });
    },

    async savePlaylist(name, trackURIs){
        if(!name || !trackURIs){
            return;
        }
        const userAccessToken = accessToken;
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        }
        let userID;
        const responseUsername = await fetch('https://api.spotify.com/v1/me',{
            headers: headers
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            return userID = jsonResponse.id;
        });

        const playlistRequestUri = `https://api.spotify.com/v1/users/${userID}/playlists`;
    }

}

export default Spotify;