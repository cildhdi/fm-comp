import "./index.scss";

import React from "react";
import { sortedUniq } from "../util/sortedUniq";

function parseParams(params: string) {
  let result: { [index: string]: string } = {};
  for (const param of params.split(" ")) {
    const [key, value] = param.split("=");
    result[key] = value || key;
  }
  return result;
}

interface BBEle {
  betype: "br" | "tag" | "closetag" | "text";
  tag?: string;
  params?: { [key: string]: string };
  raw: string;
}

const toValidReactNode = (value: any) => {
  if (value && value["betype"]) {
    return value["raw"];
  }
  return value;
};

const BBCODE_TAG_MAP = {
  color: "span",
  highlight: "span",
  size: "span",
  url: "a",
};

const BBCODE_PARAM_CONV: {
  [name: string]: (
    value: any
  ) => { props?: { [index: string]: string }; style?: React.CSSProperties };
} = {
  color: (value) => ({ style: { color: value } }),
  bgcolor: (value) => ({ style: { backgroundColor: value } }),
  size: (value) => ({ style: { fontSize: `${value}px` } }),
  width: (value) => ({ style: { width: `${value}px` } }),
  height: (value) => ({ style: { height: `${value}px` } }),
  b: () => ({ style: { fontWeight: "bold" } }),
  u: () => ({ style: { textDecorationLine: "underline" } }),
  highlight: (value) => ({ style: { backgroundColor: value } }),
  s: () => ({ style: { textDecorationLine: "line-through" } }),
  url: (value) => ({
    props: {
      target: "_blank",
      href: value.toString(),
      rel: "noopener noreferrer",
    },
  }),
  anchor: (value) => ({ props: { href: value.toString() } }),
  email: (value) => ({ props: { target: "_blank", href: `mailto:${value}` } }),
};

const parseBBCODE = (text: string) => {
  const regex = /(\n)|(\[(\w|\/)*?((\s|=).*?)?\])/gm;
  let indexs = [0, text.length];
  for (let m = regex.exec(text); m !== null; m = regex.exec(text)) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    indexs.push(m.index, m.index + m[0].length);
  }
  indexs = sortedUniq(indexs.sort((a, b) => a - b));

  const bbeles: BBEle[] = [];
  for (let index = 0; index < indexs.length - 1; index++) {
    const raw = text.substring(indexs[index], indexs[index + 1]);
    if ("\n" === raw) {
      bbeles.push({ betype: "br", raw });
    } else if (/\[\w*?((\s|=).*?)?\]/.test(raw)) {
      let sepIndex = raw.search(/\s|=/);
      if (sepIndex < 0) {
        sepIndex = raw.length - 1;
      }
      const tagName = raw.substring(1, sepIndex);
      bbeles.push({
        betype: "tag",
        tag: tagName,
        raw,
        params: {
          [tagName]: tagName,
          ...parseParams(raw.substring(1, raw.length - 1)),
        },
      });
    } else if (/\[(\w|\/)\w*?\]/.test(raw)) {
      bbeles.push({
        betype: "closetag",
        raw,
        tag: raw.substring(2, raw.length - 1),
      });
    } else {
      bbeles.push({ betype: "text", raw });
    }
  }

  const reStack: (BBEle | React.ReactNode)[] = [];
  for (let be = bbeles.shift(); be; be = bbeles.shift()) {
    switch (be.betype) {
      case "br":
        reStack.push(React.createElement("br"));
        break;
      case "text":
        reStack.push(be.raw);
        break;
      case "tag":
        switch (be.tag) {
          case "br":
            reStack.push(React.createElement("br"));
            break;
          default:
            reStack.push(be);
            break;
        }
        break;
      case "closetag":
        let children: React.ReactNode[] = [];
        let foundStartTag = false;
        while (reStack.length > 0) {
          const lastRe = reStack.pop();
          if (
            be.tag &&
            lastRe &&
            lastRe["betype"] === "tag" &&
            lastRe["tag"] === be.tag
          ) {
            let allProps = {};
            let allStyle: React.CSSProperties = {};
            const params = lastRe["params"];
            if (params) {
              for (const index in params) {
                if (BBCODE_PARAM_CONV[index]) {
                  const { props, style } = BBCODE_PARAM_CONV[index](
                    params[index]
                  );
                  allProps = { ...allProps, ...props };
                  allStyle = { ...allStyle, ...style };
                }
              }
            }
            if (be.tag === "img") {
              const firstStringIndex = children.findIndex(
                (v) => typeof v === "string"
              );
              if (firstStringIndex >= 0) {
                allProps = { ...allProps, src: children[firstStringIndex] };
              }
              children = [];
            }
            reStack.push(
              React.createElement(
                BBCODE_TAG_MAP[be.tag] || be.tag,
                {
                  ...allProps,
                  style: allStyle,
                },
                children.length !== 0 ? children : undefined
              )
            );
            children = [];
            foundStartTag = true;
            break;
          } else if (lastRe) {
            children.unshift(toValidReactNode(lastRe));
          }
        }
        while (children.length > 0) {
          reStack.push(children.shift());
        }
        if (!foundStartTag) {
          reStack.push(be);
        }
        break;
      default:
        break;
    }
  }
  return reStack.map(toValidReactNode);
};

export function BBCODE(params: { text: string }) {
  return <div className="comp-bbcode">{parseBBCODE(params.text)}</div>;
}
