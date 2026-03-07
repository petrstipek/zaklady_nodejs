import fs from "fs";

fs.readFile("instrukce.txt", (err, data) => {
  if (err) return console.error("Instructions file does not exist!");

  const lines = data.toString().split("\n");
  const inputFile = lines[0];
  const outputFile = lines[1];

  fs.readFile(inputFile, (err, data) => {
    if (err) return console.error("Input file does not exist!");

    const inputToWrite = data.toString();

    fs.writeFile(outputFile, inputToWrite, (err) => {
      if (err) return console.error("Error occured: ", err);
      console.log("The instructions were completed!");
    });
  });
});
