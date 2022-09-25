import './App.css';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { SearchResults } from '../../Components/SearchResults/SearchResults';
import { Playlist } from '../../Components/Playlist/Playlist';
import React from 'react';

export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name: 'Przejmujemy jutuby', artist: 'Ekipa', album: 'EkipaO', id: 0}, {name: 'example', artist: 'example', album: 'example', id: 4}],
      playlistName: 'Playlist Name Example',
      playlistTracks: [{name: 'Example1', artist: 'Artist1', album: 'Album1', id: 0}, {name: 'Example2', artist: 'Artist2', album: 'Album2', id: 1}]
    }
    this.addTrack = this.addTrack.bind(this);
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
        playlistTracks: this.state.playlistTracks.concat(track)
      }))
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar />
          <div className='App-playlist'>
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}  


export default App;
