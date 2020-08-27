import React from 'react';
import Main from '../Main/Main';
import Join from '../Join/Join';
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <main>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/main" exact component={Main} />
      </Router>
    </main>
  );
}

export default App;
