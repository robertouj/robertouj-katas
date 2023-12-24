export const combineFirstLastDigit = (line: string): number => {
  return Number(line)
}

export const extractFirstAndLastDigit = (line: string): number => {
  const digits = []

  for (const char of line) {
    const digit = char.match(/\d/)
    if (digit) {
      digits.push(Number(digit[0]))
    }
  }

  const firstDigit = digits[0]
  const lastDigit = digits.slice(-1)[0]
  return Number(`${firstDigit}${lastDigit}`) || 0
}

export const sumLinesNumbers = (lines: string[]): number => {
  let sum = 0
  for (const line of lines) {
    sum += extractFirstAndLastDigit(line)
  }
  return sum
}

export const extractFirstAndLastDigitOrWord = (line: string): number => {
  const digits = []

  for (let index = 0; index < line.length; index++) {
    const char = line[index]
    const isDigit = char.match(/\d/)

    if (isDigit) {
      digits.push(Number(isDigit[0]))
      continue
    }

    const word = line.substring(index)
    const isNumberAsWord = word.match(/one|two|three|four|five|six|seven|eight|nine/)
    const numbersAsWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

    if (isNumberAsWord && isNumberAsWord?.index === 0) {
      // add the number to the digits array
      digits.push(numbersAsWords.indexOf(isNumberAsWord[0]) + 1)
      // move the pointer forward to check the next char after the word
      index += isNumberAsWord?.index || 0
    }
  }

  const firstDigit = digits[0]
  const lastDigit = digits.slice(-1)[0]

  return Number(`${firstDigit}${lastDigit}`) || 0
}

export const sumLinesNumbersDigitOrWord = (lines: string[]): number => {
  let sum = 0
  for (const line of lines) {
    sum += extractFirstAndLastDigitOrWord(line)
  }
  return sum
}
