import React from "react";
import "./index.scss";
import { StyleProp, AnimationProp } from "common";
import { classnames } from "../util/classnames";

interface Props extends StyleProp, AnimationProp {
  from: "top" | "bottom" | "left" | "right";
  end?: () => void;
}

interface State {
  pause: boolean;
}

export class Slide extends React.Component<Props, State> {
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
    this.ref.current?.addEventListener(
      "animationend",
      this.animationEndListener,
      false
    );
  }

  componentWillUnmount() {
    this.ref.current?.removeEventListener(
      "animationiteration",
      this.animationIterationListener
    );
    this.ref.current?.removeEventListener(
      "animationend",
      this.animationEndListener
    );
  }

  animationIterationListener = () => {
    this.setState({ pause: true });
  };

  animationEndListener = () => this.props.end && this.props.end();

  slideOut = () => {
    this.setState({ pause: false });
  };

  render() {
    return (
      <div className={classnames("comp-slide", this.props.className)}>
        <div
          ref={this.ref}
          className="anim"
          style={{
            animationName: `anim-${this.props.from}`,
            animationPlayState: this.state.pause ? "paused" : "running",
            animationDelay: `${this.props.animationDelay || 0}s`,
            animationDuration: `${this.props.animationDuration || 1}s`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
