import React from "react";
import { Slide } from "./";

export default {
  title: "Slide 渐入渐出动画",
};

const makeEle = (from: any) => {
  return () => {
    const ref = React.useRef<Slide>(null);
    return (
      <Slide from={from} ref={ref}>
        <button
          style={{ height: 100, width: 100 }}
          onClick={() => {
            ref.current?.slideOut();
          }}
        >
          滑出
        </button>
      </Slide>
    );
  };
};

export const Left = makeEle("left");
export const Right = makeEle("right");
export const Top = makeEle("top");
export const Bottom = makeEle("bottom");
