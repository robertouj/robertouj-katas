export const combineFirstLastDigit = (line: string): number => {
  const firstDigit = extractFirstDigit(line);
  const lastDigit = extractFirstDigit(reverseString(line));

  return Number(`${firstDigit}${lastDigit}`);
}

export const sumLinesNumbers = (lines: string[]): number => {
  return lines.reduce((acc, line) => acc + combineFirstLastDigit(line), 0);
}

const extractFirstDigit = (line: string): string => {
  return line.split("").find((char) => !isNaN(parseInt(char, 10))) ?? "";
}

const reverseString = (line: string): string => {
  return line.split("").reverse().join("");
}

