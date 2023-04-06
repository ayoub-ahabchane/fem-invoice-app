const getRandomLetters = function (count: number) {
  let acc = ""; // the resulting string (to return once results appended)
  for (let i = 0; i < count; i++) {
    // generate amount
    const randomCharCode = Math.floor(Math.random() * (91 - 65)) + 65;
    acc += String.fromCharCode(randomCharCode);
  }
  return acc;
};

const characters = getRandomLetters(3);
console.log(characters);

// source: https://stackoverflow.com/a/53931775/12576846
