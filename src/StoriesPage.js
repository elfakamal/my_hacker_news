import React, { Component } from 'react';

import Story from './Story';

const MAX_STORY_TO_LOAD = 10;

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    };

    this.getStories = this.getStories.bind(this);
  }

  componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/${this.props.suffixRoute}`)
      .then(r => r.json())
      .then(r => {
        this.getStories(r.slice(0, MAX_STORY_TO_LOAD)); // only 10th first top stories
      })
      .catch(e => console.error(e));
  }

  getStories(firstsTopStoriesIds) {
    firstsTopStoriesIds.map(async id => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(r => r.json())
        .then(r => {
          this.setState((state, props) => ({
            stories: [...state.stories, r].sort((a, b) => { // DESCending order
              if (a.score < b.score)
                return 1;
              if (a.score > b.score)
                return -1;
              return 0;
            })
          }));
        })
        .catch(e => console.error(e))
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.stories.length === MAX_STORY_TO_LOAD)
      return true;

    return false;
  }

  render() {
    return (
      <div>
        <div className="btn-group justify-content-center">
          <a href="/top_stories" className={ this.props.suffixRoute === 'topstories.json' ? 'btn btn-dark' : 'btn btn-secondary' }>Top Stories</a>
          <a href="/new_stories" className={ this.props.suffixRoute === 'newstories.json' ? 'btn btn-dark' : 'btn btn-secondary' }>New Stories</a>
          <a href="/best_stories" className={ this.props.suffixRoute === 'beststories.json' ? 'btn btn-dark' : 'btn btn-secondary' }>Best Stories</a>
        </div>
        <hr />
        <div>
          {
            this.state.stories.map((story, index) => <Story key={ index } pos={ index } title={ story.title } url={ story.url } score={ story.score } author={ story.by } date={ story.time } descendants={ story.descendants } />)
          }
        </div>
      </div>
    );
  }
}

export default StoriesPage;
