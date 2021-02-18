import React, { Component } from "react";
import "./joke.css";

export default class Joke extends Component {
  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i onClick={this.props.upvote} class="fas fa-arrow-up"></i>
          <span className="joke-votes">{this.props.votes}</span>
          <i onClick={this.props.downvote} class="fas fa-arrow-down"></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-smiley">
          <i
            class="em em-rolling_on_the_floor_laughing"
            aria-role="presentation"
            aria-label="ROLLING ON THE FLOOR LAUGHING"
          ></i>
        </div>
      </div>
    );
  }
}
