import React from "react";
import { Mask } from ".";

export default {
  title: "Mask 阴影遮罩",
};

export const Index = () => (
  <Mask
    style={{
      width: 500,
      height: 500,
    }}
  >
    点击隐藏
  </Mask>
);
