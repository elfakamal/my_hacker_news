import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

import StoriesPage from './StoriesPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><a href="/" className="text-light">My Hacker News !</a></h1>
        </header>
        <BrowserRouter>
          <BaseLayout />
        </BrowserRouter>
      </div>
    );
  }
}

const BaseLayout = () => (
  <div className="BaseLayout">
    <Route path="/" exact render={ () => <StoriesPage suffixRoute="topstories.json" /> } />
    <Route path="/top_stories" exact render={ () => <StoriesPage suffixRoute="topstories.json" /> } />
    <Route path="/new_stories" exact render={ () => <StoriesPage suffixRoute="newstories.json" /> } />
    <Route path="/best_stories" exact render={ () => <StoriesPage suffixRoute="beststories.json" /> } />
  </div>
);

export default App;
