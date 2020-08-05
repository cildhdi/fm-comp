import React from "react";
import "./index.scss";
import { classnames } from "../util/classnames";
import { ClassNameProp } from "common";

interface Props extends ClassNameProp {
  type?: "primary" | "secondary";
  size?: "big" | "medium" | "small";
  onClick?: () => void;
  disabled?: boolean;
}

export class Button extends React.Component<Props> {
  render() {
    return (
      <button
        className={classnames(
          "comp-btn",
          `${
            this.props.disabled ? "disabled" : this.props.type || "secondary"
          }-btn`,
          `${this.props.size || "small"}-btn`,
          this.props.className
        )}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </button>
    );
  }
}
