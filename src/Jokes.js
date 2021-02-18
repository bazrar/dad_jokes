import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
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
      //   console.log(res.data);
      jokes.push({ joke: res.data.joke, votes: 0, id: res.data.id });
    }
    this.setState({ jokes: jokes });
  }
  handleVote(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((joke) => {
        return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke;
      }),
    }));
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
            return (
              <Joke
                key={joke.id}
                id={joke.id}
                votes={joke.votes}
                text={joke.joke}
                downvote={() => this.handleVote(joke.id, -1)}
                upvote={() => this.handleVote(joke.id, 1)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
