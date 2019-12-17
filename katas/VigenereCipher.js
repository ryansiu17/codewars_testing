import testEq from "../index.js";

function VigenèreCipher(key, abc) {
  // set up our vign. matrix
  let matrix = {};
  for (let i of abc.split("")) {
    matrix[i] = (
      abc.substring(abc.indexOf(i), abc.length) +
      abc.substring(0, abc.indexOf(i))
    ).split("");
  }
  // set up keystream
  while (key.length < abc.length) {
    key = key + key;
  }

  this.encode = function(str) {
    let out = "";
    for (let i = 0; i < str.length; i++) {
      if (abc.indexOf(str[i]) !== -1) {
        out += matrix[str.charAt(i)][abc.indexOf(key.charAt(i))];
      } else {
        out += str[i];
      }
    }
    return out;
  };
  this.decode = function(str) {
    let out = "";
    for (let i = 0; i < str.length; i++) {
      if (abc.indexOf(str[i]) !== -1) {
        out += abc[matrix[key.charAt(i)].indexOf(str.charAt(i))];
      } else {
        out += str[i];
      }
    }
    return out;
  };
}

var abc, key, c;
abc = "abcdefghijklmnopqrstuvwxyz";
key = "password";

c = new VigenèreCipher(key, abc);

testEq(c.encode("codewars"), "rovwsoiv");
testEq(c.decode("rovwsoiv"), "codewars");

testEq(c.encode("waffles"), "laxxhsj");
testEq(c.decode("laxxhsj"), "waffles");

testEq(c.encode("CODEWARS"), "CODEWARS");
testEq(c.decode("CODEWARS"), "CODEWARS");
