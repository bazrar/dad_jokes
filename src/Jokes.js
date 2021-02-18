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
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.seenJokes = new Set(this.state.jokes.map((j) => j.joke));
  }
  componentDidMount() {
    // console.log("cdm");
    // console.log(window.localStorage.getItem("jokes"));
    if (window.localStorage.getItem("jokes") === null) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      console.log("get jokes");
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        //   console.log(res.data);
        let newJoke = res.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ joke: newJoke, votes: 0, id: res.data.id });
        } else {
          console.log("duplicate found");
          console.log(newJoke);
        }
      }

      this.setState((st) => {
        return { jokes: [...st.jokes, ...jokes], loading: false };
      });
      window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
    } catch (err) {
      console.error(err);
    }
  }

  handleVote(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((joke) => {
          return joke.id === id ? { ...joke, votes: joke.votes + delta } : joke;
        }),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  handleClick() {
    this.setState({ loading: true }, () => this.getJokes());
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="jokeList-title">loading ...</h1>
        </div>
      );
    } else {
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
            <button onClick={this.handleClick} className="jokeList-btn">
              new jokes
            </button>
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
}
