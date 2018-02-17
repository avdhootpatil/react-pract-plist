import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';



let defaultStyle = {
  color: '#93A661'
};


let fakeServerData = {
  user: {
    name: ' Doe ',
    playlists: [
      {
        name: 'My favoutrites',
        songs: [{name: 'bast',duration: 1321},
                {name: 'hey brother',duration: 5432},
                {name: 'rosa',duration: 2642}]
      },
      {
        name: 'Discover weekly',
        songs: [{name: 'He song',duration:5421},
                {name: 'It song',duration: 2431},
                {name: 'She song',duration:1231}]
      },
      {
        name: 'Best playlist',
        songs: [{name: 'Avicii',duration:6332},
                {name: 'Sick boy',duration: 4311},
                {name: 'The days',duration: 2542}]
      },
      {
        name: 'Nice playlist',
        songs: [{name: 'The nights',duration: 6583},
                {name: 'Congratulations',duration: 9784},
                {name: 'Rockstar',duration: 5422}]
      }
    ]
  }
};

class PlaylistCounter extends Component{
    render () {
      return (
          <div style = {{...defaultStyle,width: "40%" , display: 'inline-block'}}> 
             <h2>{this.props.playlists.length} playlists</h2>
          </div>
      );
    }
}


class HoursCounter extends Component{
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylists) => {
      return songs.concat(eachPlaylists.songs)
    }, [])
    let totalDuration = allSongs.reduce( (sum,eachSong) =>{
      return sum + eachSong.duration;
    },0)
    return (
        <div style = {{...defaultStyle,width: "40%" , display: 'inline-block'}}> 
           <h2>{Math.round(totalDuration/60)} Hours</h2>
        </div>
    );
  }
}



class Filter extends Component{
  render () {
    return (
      <div style={defaultStyle} >
        <img/>
        <input type="text" onKeyUp={event =>{
          this.props.onTextChange(event.target.value)
        }}/>
      </div>
    );
  }
}



class Playlist extends Component{
  render () {
    return (
      <div style = {{...defaultStyle,display: 'inline-block', width: "25%"}} >
        <img/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {
            this.props.playlist.songs.map(song =>
              <li>{song.name}</li>
            )
          }</ul>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {},
                  filterString: ''}
    
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    },2000);
  }

  render() {
    let playlistToRender  = this.state.serverData.user ?
     this.state.serverData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
         <div>
            <h1 style = {{...defaultStyle,'font-size': '54px'  }} >
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={playlistToRender}/>
            <HoursCounter playlists={ playlistToRender}/>
            <Filter onTextChange = {text =>{
                  this.setState({filterString: text})
            }}/>
            {
              playlistToRender.map(playlists =>
                <Playlist playlist = {playlists}/>
              )
            }
            
            </div> : <img src={logo} className='App-logo'/>
            }
      </div>
    );
  }
}






export default App;
