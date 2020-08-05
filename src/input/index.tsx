import React from "react";
import "./index.scss";
import { StyleProp } from "common";
import { classnames } from "../util/classnames";
import "./index.scss";

interface Props extends StyleProp {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export class Input extends React.Component<Props> {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        className={classnames("comp-input", this.props.className)}
        style={this.props.style}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
      />
    );
  }
}
