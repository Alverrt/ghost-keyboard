/* eslint-disable */ 
let randomInteger = async (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomTimeout = async (min, max) => {
  min = typeof min !== "undefined" ? min : 100;
  max = typeof max !== "undefined" ? max : 300;

  let calculatedTimeout = await randomInteger(min, max);

  return { delay: calculatedTimeout };
};

const getRandomChar = async () => {
  const randomChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "k",
    "n",
    "m",
    "t",
    "r",
    "u",
  ];
  let randomIndexNumber = await randomInteger(0, randomChars.length - 1);
  const requestedChar = randomChars[randomIndexNumber]
  return requestedChar;
};

let decideMistakeIndex = (arrayLength) => {
  let indexOfMistake = randomInteger(0, arrayLength - 1);
  return indexOfMistake;
};

const makeMistakeAndFix = async (page, element) => {
  const randomChar = await getRandomChar();
  await page.keyboard.type(randomChar, await randomTimeout());
  await page.keyboard.press("Backspace", await randomTimeout());
  await page.keyboard.type(element, await randomTimeout());
};

async function humanType(page, typeString) {

  const DIVIDER = 4; //karakter basina ne kadar max hata yapilacagini ayarlar, ne kadar fazla o kadar az hata
  const minMistakeCount = 0;

  const arrayChars = await typeString.split("");
  const maxMistakeCount = parseInt((arrayChars.length / DIVIDER));
  const mistakeCount = await randomInteger(minMistakeCount, maxMistakeCount);

  const mistakeIndexes = [];

  for (let i = 0; i < mistakeCount; i++) {
    mistakeIndexes.push(await decideMistakeIndex(arrayChars.length));
  }

  for (let i = 0; i < arrayChars.length; i++) {
    const element = arrayChars[i];
    if (!mistakeIndexes.includes(i)) {
      await page.keyboard.type(element, await randomTimeout());
    } else {
      await makeMistakeAndFix(page, element);
    }
  }

  //await page.keyboard.type(typeString, { delay: 100 });
}

module.exports = { humanType };
