import fs from "fs/promises";

const main = async () => {
  let data;
  try {
    data = await fs.readFile("instrukce.txt");
  } catch (err) {
    return console.error("The file instrukce.txt does not exist", err);
  }

  const n = parseInt(data);
  const promisesToResolve = [];

  for (let i = 0; i <= n; i++) {
    promisesToResolve.push(fs.writeFile(`${i}.txt`, `Soubor ${i}`));
  }

  try {
    await Promise.all(promisesToResolve);
  } catch (err) {
    return console.error("Error occurred ", err);
  }

  console.log("Program finished, the content is in the files!");
};

main();
