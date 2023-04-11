import Path from "./path";

export function routing(path: Path, ...a: string[]) {
  let args = Array.prototype.slice.call(arguments, 1);
  let count = -1;
  return path.replace(/:[a-zA-Z?]+/g, function (match) {
    count += 1;
    return args[count] !== undefined ? args[count] : match;
  });
}
