import { Input } from ".";
import React from "react";

export default {
  title: "Input 输入框",
};

export const Index = () => {
  const [value, setValue] = React.useState("12345");
  return <Input value={value} onChange={(value) => setValue(value)} />;
};

export const Disabled = () => <Input disabled />;

export const Placeholder = () => <Input placeholder="请输入文本" />;
