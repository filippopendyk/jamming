let accessToken;
const clientId = 'ff90f41cfa5c4c0ebc1e2b3c831e44c2';
const redirectUri = 'http://localhost:3000';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // check for an access token match
        const accessTokenMatch = window.location.href.match(/access_token([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;