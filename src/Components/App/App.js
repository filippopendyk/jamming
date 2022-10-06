import './App.css';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { SearchResults } from '../../Components/SearchResults/SearchResults';
import { Playlist } from '../../Components/Playlist/Playlist';
import React from 'react';
import Spotify from '../../util/Spotify';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name Example',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const filteredPlaylist = this.state.playlistTracks.filter(playlistTrack => {
      if(playlistTrack.id === track.id){
        return true;
      }
      return false;
    });

    if(filteredPlaylist.length !== 0){
      console.log('piosenka jest juz w playliscie');
      return;
    } else {
      this.setState(prevState => ({
        playlistTracks: this.state.playlistTracks.concat(track),
        searchResults: this.state.searchResults.filter(trackItem => trackItem !== track)
      }))
    }

  }

  removeTrack(track){
    this.setState(prevState => ({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
        if(playlistTrack.id !== track.id){
          return true;
        }
        return false;
      }),
      searchResults: [track, ...this.state.searchResults]
    }))
  }

  updatePlaylistName(name){
    if(typeof name === 'string'){
      this.setState(prevState => ({
        playlistName: name
      }))
    } else{
      return;
    }
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    }); 
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render(){
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}  


export default App;
