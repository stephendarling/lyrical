import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: {
        // could be condensed to just id, but leaving it like this for visual
        id: id
      },
    })
    // this.props.data.refetch can only be used to update the same component the action is taken on
    .then(() => this.props.data.refetch())
  }

  renderSongs() {
    // Destructures the id and title from the individual object as single words
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`} >{title}</Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }
  
  render () {
    if (this.props.data.loading) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default graphql(mutation)(
  graphql(query)(SongList)
)