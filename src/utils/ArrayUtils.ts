/**
 * Split a list of strings by each element in the splits array
 * @param {Array<string>} splits List of strings to split by
 * @param {Array<string>} elements List of strings to be split
 */
export function SplitAllByAll(splits: Array<string>, elements: Array<string>): Array<string> {
  if(!splits || splits.length === 0) return elements;

  return elements.map(v => v.split(splits[0]))
    .reduce((p, c) => p.concat(SplitAllByAll(splits.slice(1)/*?*/, c)), []);
}

export function SortByLengthDesc(a:string|Array<any>, b:string|Array<any>) {
  return b.length - a.length;
}
