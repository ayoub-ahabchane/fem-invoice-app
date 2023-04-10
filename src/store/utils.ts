const getRandomLetters = function (count: number) {
  let acc = ""; // the resulting string (to return once results appended)
  for (let i = 0; i < count; i++) {
    // generate amount
    const randomCharCode = Math.floor(Math.random() * (91 - 65)) + 65;
    acc += String.fromCharCode(randomCharCode);
  }
  return acc;
};

// source: https://stackoverflow.com/a/53931775/12576846

export function toEnglishDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function asCurrency(locale: string, amount: number): string {
  return amount.toLocaleString(locale, {
    compactDisplay: "long",
    minimumFractionDigits: 2,
  });
}
