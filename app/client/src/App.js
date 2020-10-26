import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    response: [
      {
        name: "",
        address: "",
        review: "",
        username: "",
      },
    ],
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/redwood/icecream");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    var array = [];
    body.forEach((element) => {
      var obj = {};
      obj.name = element.name;
      obj.address = element.location.address1 + element.location.city;
      obj.review = element.review;
      obj.username = element.username;
      array.push(obj);
    });
    return array;
  };

  render() {
    return (
      <div>
        <div className="App">
          <p>Top ten Ice cream shops in Redwood City</p>
        </div>
        <div>
          {this.state.response.map((item) => {
            return (
              <div className="yellow">
                <div className="flex">
                  <p className="blue">Business Name: </p>
                  <p className="purple">{item.name}</p>
                </div>
                <div className="flex">
                  <p className="blue">Address: </p>
                  <p className="purple">{item.address}</p>
                </div>
                <div className="flex">
                  <p className="blue">Top Review: </p>
                  <p className="purple">{item.review}</p>
                </div>
                <div className="flex">
                  <p className="blue">Review By: </p>
                  <p className="purple">{item.username}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
