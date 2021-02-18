import React, { Component } from "react";

export default class Joke extends Component {
  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i onClick={this.props.upvote} class="fas fa-arrow-up"></i>
          <span>{this.props.votes}</span>
          <i onClick={this.props.downvote} class="fas fa-arrow-down"></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
      </div>
    );
  }
}
