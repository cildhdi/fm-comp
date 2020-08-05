import React from "react";
import { Button } from ".";

export default {
  title: "Button",
};

export const ButtonType = () => (
  <>
    <Button type="primary">primary 按钮</Button>{" "}
    <Button type="secondary">secondary 按钮</Button>
  </>
);

export const ButtonSize = () => (
  <>
    <Button type="primary" size="big">
      big 按钮
    </Button>{" "}
    <Button type="primary" size="medium">
      medium 按钮
    </Button>{" "}
    <Button type="primary" size="small">
      small 按钮
    </Button>{" "}
  </>
);

export const ButtonClick = () => (
  <Button onClick={() => console.log("button click")}>按钮点击</Button>
);

export const ButtonDisabled = () => (
  <Button disabled onClick={() => console.log("button click")}>
    按钮点击
  </Button>
);
