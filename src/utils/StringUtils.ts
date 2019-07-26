export function format(value: string, ...args: any[]) {
  let s = value;
  for (var i = 0; i < arguments.length - 1; i++) {
    var arg = arguments[i+1];
    if(arg === undefined || arg === null) continue;

    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arg.toString());
  }
  return s;
}

format("test {0} string {1}", 5, "oh");//?
