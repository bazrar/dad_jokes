import React, { Component } from "react";
import "./joke.css";

export default class Joke extends Component {
  getEmoji() {
    if (this.props.votes <= 0) {
      return (
        <i
          class="em em-angry"
          aria-role="presentation"
          aria-label="ANGRY FACE"
        ></i>
      );
    } else if (this.props.votes <= 3) {
      return (
        <i
          class="em em-cry"
          aria-role="presentation"
          aria-label="CRYING FACE"
        ></i>
      );
    } else if (this.props.votes <= 6) {
      return (
        <i
          class="em em-rolling_on_the_floor_laughing"
          aria-role="presentation"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        ></i>
      );
    } else if (this.props.votes <= 9) {
      return (
        <i
          class="em em-blush"
          aria-role="presentation"
          aria-label="SMILING FACE WITH SMILING EYES"
        ></i>
      );
    } else if (this.props.votes <= 12) {
      return (
        <i
          class="em em-angel"
          aria-role="presentation"
          aria-label="BABY ANGEL"
        ></i>
      );
    } else {
      return (
        <i
          class="em em-innocent"
          aria-role="presentation"
          aria-label="SMILING FACE WITH HALO"
        ></i>
      );
    }
  }

  getColor() {
    if (this.props.votes <= 0) {
      return "#ff5e78";
    } else if (this.props.votes <= 3) {
      return "#f1e189";
    } else if (this.props.votes <= 6) {
      return "#d2e603";
    } else if (this.props.votes <= 9) {
      return "#81b214";
    } else if (this.props.votes <= 12) {
      return "#158467";
    } else {
      return "#54e346";
    }
  }

  render() {
    return (
      <div className="joke">
        <div className="joke-buttons">
          <i
            style={{ color: this.getColor() }}
            onClick={this.props.upvote}
            class="fas fa-arrow-up"
          ></i>
          <span className="joke-votes">{this.props.votes}</span>
          <i
            style={{ color: this.getColor() }}
            onClick={this.props.downvote}
            class="fas fa-arrow-down"
          ></i>
        </div>
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-smiley">{this.getEmoji()}</div>
      </div>
    );
  }
}
