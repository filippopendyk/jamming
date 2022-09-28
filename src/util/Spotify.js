let accessToken;

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
        }
    }
}

export default Spotify;