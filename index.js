export default function testEq(input, expected) {
  if (input === expected) {
    console.log("Test Success");
  } else {
    console.log("\nTest Failed");
    console.log("Expected " + expected + ", instead got");
    console.log(input + "\n");
  }
}
