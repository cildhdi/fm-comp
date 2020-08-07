import React from "react";
import { ActionSheet } from ".";

export default {
  title: "ActionSheet",
};

export const Index = () =>
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

      public confirm = () => {
        this.setState({ showPicker: false });
      };

      click = (value: string) => {
        console.log(`click ${value}`);
      };

      public render() {
        return !this.state.showPicker ? (
          <button onClick={this.show}>显示 ActionSheet</button>
        ) : (
          <ActionSheet<string>
            onClose={this.confirm}
            style={{
              height: "90vh",
              width: "500px",
            }}
            title="在下方选择一个选项..."
            items={[
              { value: "选项1", onClick: this.click },
              { value: "选项2", onClick: this.click },
              { value: "选项3", onClick: this.click },
            ]}
          />
        );
      }
    }
  );
