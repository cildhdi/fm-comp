import React from "react";
import { Picker, Item } from ".";

export default {
  title: "Picker 选择器",
};

const generateItems = (max: number) => {
  const items: Item[] = [];
  for (let index = 0; index < max; index++) {
    items.push({
      label: index,
      value: index.toString(),
    });
  }
  return items;
};

export const Single = () =>
  React.createElement(
    class extends React.Component<
      {},
      {
        showPicker: boolean;
      }
    > {
      public state = {
        showPicker: false,
      };

      public show = () => {
        this.setState({ showPicker: true });
      };

      public confirm = (v: any) => {
        this.setState({ showPicker: false });
        console.log(v);
      };

      public render() {
        return !this.state.showPicker ? (
          <button onClick={this.show}>显示 Picker</button>
        ) : (
          <Picker
            onClose={this.confirm}
            style={{
              height: "90vh",
            }}
            columnOpts={[
              {
                key: "1",
                items: () => generateItems(10),
              },
            ]}
          />
        );
      }
    }
  );

export const Multi = () =>
  React.createElement(
    class extends React.Component<
      {},
      {
        showPicker: boolean;
      }
    > {
      public state = {
        showPicker: false,
      };

      public show = () => {
        this.setState({ showPicker: true });
      };

      public confirm = (v: any) => {
        this.setState({ showPicker: false });
        console.log(v);
      };

      public render() {
        return !this.state.showPicker ? (
          <button onClick={this.show}>显示 Picker</button>
        ) : (
          <Picker
            onClose={this.confirm}
            style={{
              height: "90vh",
            }}
            columnOpts={[
              {
                key: "1",
                items: () => generateItems(10),
              },
              {
                key: "2",
                items: (selectedValue) =>
                  selectedValue["1"]
                    ? generateItems(Number.parseInt(selectedValue["1"]))
                    : [],
              },
              {
                key: "3",
                items: (selectedValue) =>
                  selectedValue["2"]
                    ? generateItems(Number.parseInt(selectedValue["2"]))
                    : [],
              },
            ]}
          />
        );
      }
    }
  );
