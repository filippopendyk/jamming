import React from "react";
import { TrackList } from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        const newName = e.target.value;
        this.props.onNameChange(newName);
    }

    render(){
        return(
            <div className="Playlist">
                <input defaultValue={'New playlist'} onChange={this.handleNameChange}></input>
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}