const random_number = Math.floor(Math.random() * 11);

for (let guess_count = 0; guess_count < 5; guess_count++) {
  let guess = Number(prompt("Type in number between 0 and 10 including."));

  if (guess === random_number) {
    console.log("You guessed the number!");
    break;
  }

  if (guess_count === 4) {
    console.log("You lost, the number to guess was: ", random_number);
  } else if (guess < random_number)
    console.log("The desired number is bigger than your guess.");
  else console.log("The desired number is smaller than your guess.");
}
