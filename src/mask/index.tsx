import React from "react";
import "./index.scss";
import "../common.scss";
import { StyleProp, AnimationProp } from "common";
import { classnames } from "../util/classnames";

interface State {
  pause: boolean;
}

interface Props {
  onClick?: () => void;
  align?: "left" | "right" | "top" | "bottom";
}

export class Mask extends React.Component<
  StyleProp & AnimationProp & Props,
  State
> {
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
    this.setState({ pause: false }, this.props.onClick);
  };

  render() {
    return (
      <div className={classnames("comp-mask", this.props.className)}>
        <div
          ref={this.ref}
          className="anim"
          style={{
            animationName: `anim-mask`,
            animationPlayState: this.state.pause ? "paused" : "running",
            animationDelay: `${this.props.animationDelay || 0}s`,
            animationDuration: `${this.props.animationDuration || 1}s`,
            ...this.props.style,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              this.hide();
            }
          }}
        >
          <div
            className="children"
            style={
              this.props.align && {
                [this.props.align]: 0,
              }
            }
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
