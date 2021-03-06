import React, {Component} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";
import Searchbar from "../../component/SearchBar/Searchbar";

class Search extends Component {
    state = {
        album: []
    };

    componentDidMount() {
        this.getAlbums();
    }

    getAlbums=()=>{
        axios({
            "method":"GET",
            "url":"https://deezerdevs-deezer.p.rapidapi.com/search/",
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key":"83a625aec2msh726dabaf81d700cp17962fjsn1ce43bc6aff4"
            },"params":{
                "q":""+this.props.match.params.keyword
            }
        })
            .then((response)=>{
                console.log(response)
                this.setState({
                    album:response.data.data
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    componentDidUpdate(prevProps) {
        if(this.props!=prevProps){
            this.getAlbums();
        }
    }

    render() {
        return (

            <div className="search">
                <Searchbar/>

                <div className="content">
                    <div className="ad1"><img
                        src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/>
                        <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/>
                    </div>
                <div className="movie-list">
                    {console.log(this.state.album)}
                    {this.state.album.map((album) => (
                        <div className="movie">
                            <img src={album.album.cover_medium} alt=""/>
                            <div className="movie-title">
                                <Link to={'/details/'+ album.album.id}>{album.title}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                    <div className="ad1"><img
                        src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/>
                        <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/> <br/>
                        <img src="https://s3.envato.com/files/116351238/02_preview-vertical-banner.jpg"/>
                    </div>
            </div>
            </div>

        )
    }
}

export default Search;