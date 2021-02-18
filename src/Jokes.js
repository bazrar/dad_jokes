import React, { Component } from "react";
import axios from "axios";
import "./jokeList.css";

export default class Jokes extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
  }
  async componentDidMount() {
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      jokes.push(res.data);
    }
    this.setState({ jokes: jokes });
  }
  render() {
    return (
      <div className="jokeList">
        <div className="jokeList-sidebar">
          <h1 className="jokeList-title">
            <span>Dad</span>jokes
            <img
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/face-with-tears-of-joy_1f602.png"
              alt="emoji"
            />
          </h1>
          <button className="jokeList-btn">new jokes</button>
        </div>
        <div className="jokeList-jokes">
          {this.state.jokes.map((joke) => {
            return <div>{joke.joke}</div>;
          })}
        </div>
      </div>
    );
  }
}
