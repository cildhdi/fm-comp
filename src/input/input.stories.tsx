import { Input } from ".";
import React from "react";

export default {
  title: "Input",
};

export const InputDefault = () => {
  const [value, setValue] = React.useState("12345");
  return <Input value={value} onChange={(value) => setValue(value)} />;
};

export const InputDisabled = () => <Input disabled />;

export const InputPlaceholder = () => <Input placeholder="请输入文本" />;
