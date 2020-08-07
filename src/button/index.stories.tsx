import React from "react";
import { Button } from ".";

export default {
  title: "Button 按钮",
};

export const Type = () => (
  <>
    <Button type="primary">primary 按钮</Button>{" "}
    <Button type="secondary">secondary 按钮</Button>
  </>
);

export const Size = () => (
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

export const Click = () => (
  <Button onClick={() => console.log("button click")}>按钮点击</Button>
);

export const Disabled = () => (
  <Button disabled onClick={() => console.log("button click")}>
    按钮点击
  </Button>
);
