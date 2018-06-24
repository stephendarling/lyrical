import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {

  constructor(props) {
    super(props)
    this.state = { title: '' }
    
  }
  
  onSubmit(event) {
    event.preventDefault()
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
      // Forces query refetch. We don't have any variables so we aren't passing anything. Could be 
      // condenses down to query instead of `query: query` because of ES6. Can't use refetch here
      // because we're refetching a query associated with a different component
      refetchQueries: [{ query: query, variables: {} }]
    }).then( () => hashHistory.push('/'))
  }

  render () {

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input 
            onChange={ event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default graphql(mutation)(SongCreate)