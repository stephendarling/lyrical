import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends Component {
  onLike(id,likes) {
    this.props.mutate({ 
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          __typename: 'LyricType',
          // ES6 condensed from id: id
          id,
          // This will be replaced by the actual response as soon as this is returned 
          // from the server. 
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <div className="row" key={id}>
          <div className="col s10">
              {content}
          </div>
          <div className="col s1">
            <i 
              className='material-icons' 
              onClick={() => this.onLike(id,likes)}
            >
              thumb_up
            </i>
          </div>
          <div className="col s1">
            {likes}
          </div>
        </div>
      )
    })
  }
  render () {
    return (
      <div className="wrapper">
        {this.renderLyrics()}
      </div>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)