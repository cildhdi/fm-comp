import React from "react";
import { Slide } from "../slide";
import "./index.scss";
import { StyleProp } from "../common";
import { Mask } from "../mask";
import { classnames } from "../util/classnames";

interface Item<T> {
  value: T;
  title?: string;
  onClick?: (value: T) => void;
}

interface Prop<T> extends StyleProp {
  title: string;
  items: Item<T>[];
  onClose: () => void;
}

interface State<T> {
  curItem?: Item<T>;
}

export class ActionSheet<T extends Object> extends React.Component<
  Prop<T>,
  State<T>
> {
  state: State<T> = {
    curItem: undefined,
  };

  slideRef = React.createRef<Slide>();

  render() {
    return (
      <Mask
        onClick={() => this.slideRef.current?.slideOut()}
        align="bottom"
        className={classnames(this.props.className, "comp-actionsheet")}
        style={this.props.style}
      >
        <Slide
          ref={this.slideRef}
          from="bottom"
          className="picker"
          end={() => {
            const { curItem } = this.state;
            if (curItem) {
              curItem.onClick && curItem.onClick(curItem.value);
            }
            this.props.onClose();
          }}
        >
          <div className="content">
            <div className="indicator" />
            <div className="as-title">{this.props.title}</div>
            {this.props.items.map((item) => (
              <div
                className="item"
                key={item.value.toString()}
                onClick={() => {
                  this.setState(
                    { curItem: item },
                    this.slideRef.current?.slideOut
                  );
                }}
              >
                {item.title || item.value}
              </div>
            ))}
          </div>
        </Slide>
      </Mask>
    );
  }
}
