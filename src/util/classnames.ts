export function classnames(
  ...args: (string | boolean | undefined | number | { [index: string]: any })[]
) {
  let className = "";
  for (const arg of args) {
    if (typeof arg === "object") {
      if (!arg) {
        continue;
      }
      for (const index in arg) {
        if (arg[index]) {
          className += arg[index] + " ";
        }
      }
    } else if (arg) {
      className += arg.toString() + " ";
    }
  }
  return className;
}
