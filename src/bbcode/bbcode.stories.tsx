import React from "react";
import { BBCODE } from ".";

export default {
  title: "BBCODE parser",
};

export const Index = () => {
  const [text, setText] = React.useState(`
[center]居中[/center]
[b]粗体[/b]
[u]下划线[/u]
[highlight=yellow]高亮[/highlight]
[color=yellow]黄色字体[/color]
[s]删除线[/s]
[i]斜体[/i]
[size=40]变大[/size]
[br]
换行
[code]代码显示[/code]
[ol][li]第一[/li][li]第二[/li][/ol]
[ul][li]无序第一[/li][li]无序第二[/li][/ul]
[img width=300 height=500]https://i.loli.net/2020/03/13/dFCvfnkc7K825Tj.gif[/img]
[url=https://www.baidu.com]点击百度一下[/url]`);
  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "200px",
        }}
      />
      <BBCODE text={text} />
    </>
  );
};
