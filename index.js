export default function testEq(input, expected) {
  if (input === expected) {
    console.log("Test Success");
  } else {
    console.log("Test Failed");
    console.log("Expected " + expected + ", instead got");
    console.log(input);
  }
}
