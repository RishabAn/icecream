import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res}))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/redwood/icecream');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
render() {
    return (
      <div className="App">
        <p>Top ten Ice cream shops in Redwood City</p>
        <p>{this.state.response.text}</p>
      </div>
    );
  }
}

export default App;
