import testEq from "../index.js";
var recoverSecret = function(triplets) {
  let p = {};
  for (let trip of triplets) {
    let [first, second, third] = trip;
    if (p[first]) {
      p[first].add(second);
      p[first].add(third);
    } else {
      p[first] = new Set();
      p[first].add(second);
      p[first].add(third);
    }

    if (p[second]) {
      p[second].add(third);
    } else {
      p[second] = new Set(third);
    }
  }

  let singles = new Set();
  while (Object.values(p).some(x => x.size !== 1)) {
    // get singles
    for (let set of Object.values(p)) {
      if (set.size === 1) {
        singles.add([...set][0]);
      }
    }
    // remove singles from other
    for (let key of Object.keys(p)) {
      if (p[key].size !== 1) {
        for (let val of [...singles]) {
          p[key].delete(val);
        }
      }
    }
  }
  for (let key of Object.keys(p)) {
    p[key] = [...p[key]][0];
  }

  let first = Object.keys(p).filter(x => !Object.values(p).includes(x))[0];
  let last = Object.values(p).filter(x => !Object.keys(p).includes(x))[0];
  let out = first;
  let i = first;

  while (out.indexOf(last) === -1) {
    out += p[i];
    i = p[i];
  }

  return out;
};

let secret1 = "whatisup";
let triplets1 = [
  ["t", "u", "p"],
  ["w", "h", "i"],
  ["t", "s", "u"],
  ["a", "t", "s"],
  ["h", "a", "p"],
  ["t", "i", "s"],
  ["w", "h", "s"]
];

testEq(recoverSecret(triplets1), secret1);
