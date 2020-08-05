import React from "react";
import "./index.scss";
import "../common.scss";
import { StyleProp, AnimationProp } from "common";
import { classnames } from "../util/classnames";

interface State {
  pause: boolean;
}

export class Mask extends React.Component<StyleProp & AnimationProp, State> {
  ref = React.createRef<HTMLDivElement>();
  state: State = {
    pause: false,
  };

  componentDidMount() {
    this.ref.current?.addEventListener(
      "animationiteration",
      this.animationIterationListener,
      false
    );
  }

  componentWillUnmount() {
    this.ref.current?.removeEventListener(
      "animationiteration",
      this.animationIterationListener
    );
  }

  animationIterationListener = () => {
    this.setState({ pause: true });
  };

  hide = () => {
    this.setState({ pause: false });
  };

  render() {
    return (
      <div
        ref={this.ref}
        className={classnames("comp-slide", this.props.className, "center")}
        style={{
          animationName: `anim-mask`,
          animationPlayState: this.state.pause ? "paused" : "running",
          animationDelay: `${this.props.animationDelay || 0}s`,
          animationDuration: `${this.props.animationDuration || 1}s`,
          ...this.props.style,
        }}
        onClick={this.hide}
      >
        {this.props.children}
      </div>
    );
  }
}
