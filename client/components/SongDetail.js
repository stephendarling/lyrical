import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import fetchSong from '../queries/fetchSong'
import { Link } from 'react-router'

import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

class SongDetail extends Component {
  render () {
    const { song } = this.props.data
    // If there isn't a song yet (could also check for loading data prop) return nothing
    if (!song) { return <div></div>}
    return (
      <div>
        <div className="row">
          <div className="col s12">
          <Link
            to="/"
            className="btn-floating btn-large red left"
          >
            <i className="material-icons">navigate_before</i>
          </Link>
          </div>
        </div>
        <div>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics}/>
          <LyricCreate songId={this.props.params.id}/>
        </div>
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetail)