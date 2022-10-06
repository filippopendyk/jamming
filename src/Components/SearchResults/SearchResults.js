import React from "react";
import { TrackList } from '../TrackList/TrackList';
import './SearchResults.css';

export class SearchResults extends React.Component{
    render(){
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList isOnPlaylist={false} onAdd={this.props.onAdd} isRemoval={false} tracks={this.props.searchResults}/>
            </div>
        )
    }
}