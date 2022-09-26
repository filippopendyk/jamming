const userAccessToken = '';

class Spotify {
    getAccessToken(){
        if(!(userAccessToken === '')){
            return userAccessToken;
        }
    }
}

export default Spotify;