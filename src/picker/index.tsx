import React from "react";
import { Slide } from "../slide";
import "./index.scss";
import { StyleProp } from "common";
import { Mask } from "../mask";

export interface Item {
  label: React.ReactNode;
  value: string;
}

interface ColumnProp {
  itemHeight: number;
  height: number;
  items: Item[];
  onChange: (value?: string) => void;
}

class Cloumn extends React.Component<ColumnProp> {
  private timer: number = 0;
  private ref = React.createRef<HTMLDivElement>();

  private onScroll = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.scrollEnd as TimerHandler, 500);
  };

  private scrollEnd = () => {
    if (this.ref.current) {
      const index = Math.round(
        this.ref.current.scrollTop / this.props.itemHeight
      );
      if (index >= 0 && index < this.props.items.length) {
        this.props.onChange(this.props.items[index].value);
      } else {
        this.props.onChange(undefined);
      }
    }
  };

  public render() {
    const topBottomPadding = `${
      (this.props.height - this.props.itemHeight) / 2
    }px`;
    return (
      <div
        className="column"
        style={{ height: this.props.height }}
        onScroll={this.onScroll}
        ref={this.ref}
      >
        {this.props.items.map((item, index) => (
          <div
            className="item"
            style={{
              height: this.props.itemHeight,
              lineHeight: `${this.props.itemHeight}px`,
              paddingTop: index === 0 ? topBottomPadding : "0",
              paddingBottom:
                index === this.props.items.length - 1 ? topBottomPadding : "0",
            }}
            key={item.value}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }
}

type SelectedValueType = { [key: string]: string };

interface ColumnOpt {
  key: string;
  items: (selectedValue: SelectedValueType) => Item[];
}

interface Props extends StyleProp {
  itemHeight?: number;
  height?: number;
  onClose: (selectedValue?: SelectedValueType) => void;
  columnOpts: ColumnOpt[];
}

interface State {
  selectedValue: SelectedValueType;
  confirm: boolean;
}

export class Picker extends React.Component<Props, State> {
  public state: State = {
    selectedValue: {},
    confirm: false,
  };

  slideRef = React.createRef<Slide>();

  public constructor(props: Props) {
    super(props);
    const initState = {};
    this.props.columnOpts.reduce((prevValue: SelectedValueType, current) => {
      const items = current.items(prevValue);
      if (items.length > 0) {
        prevValue[current.key] = items[0].value;
      }
      return prevValue;
    }, initState);
    this.state.selectedValue = initState;
  }

  private onColumnChange = (key: string) => {
    return (value?: string) => {
      const newSelectedValue = { ...this.state.selectedValue };
      if (value) {
        newSelectedValue[key] = value;
      } else {
        delete newSelectedValue[key];
      }
      this.setState({
        selectedValue: newSelectedValue,
      });
    };
  };

  private onEnd = () => {
    this.props.onClose(
      this.state.confirm ? this.state.selectedValue : undefined
    );
  };

  private onCancel = () => {
    this.setState(
      {
        confirm: false,
      },
      this.slideRef.current?.slideOut
    );
  };

  private onConfirm = () => {
    this.setState(
      {
        confirm: true,
      },
      this.slideRef.current?.slideOut
    );
  };

  public render() {
    const itemHeight = this.props.itemHeight || 30;
    const height = this.props.height || 300;
    return (
      <Mask
        onClick={this.onCancel}
        className={this.props.className}
        style={this.props.style}
        align="bottom"
      >
        <Slide
          ref={this.slideRef}
          from="bottom"
          className="picker"
          end={this.onEnd}
        >
          <div className="content">
            <div className="title">
              <div onClick={this.onCancel}> 取消 </div>
              <div onClick={this.onConfirm}> 完成 </div>
            </div>
            <div className="columns-container" style={{ height: height }}>
              <div className="indicator-container">
                <div className="top" />
                <div className="indicator" style={{ height: itemHeight }} />
                <div className="bottom" />
              </div>
              <div className="columns">
                {this.props.columnOpts.map((opt) => {
                  return (
                    <Cloumn
                      items={opt.items(this.state.selectedValue)}
                      height={height}
                      itemHeight={itemHeight}
                      onChange={this.onColumnChange(opt.key)}
                      key={opt.key}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Slide>
      </Mask>
    );
  }
}
