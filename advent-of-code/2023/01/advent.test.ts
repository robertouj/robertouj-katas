import { describe, it, expect } from 'vitest'
import {
  extractFirstAndLastDigit,
  extractFirstAndLastDigitOrWord,
  sumLinesNumbers,
  sumLinesNumbersDigitOrWord,
} from './advent'
import fs from 'node:fs'

describe('Advent test suite 2023 - 01', () => {
  describe('Part One', () => {
    it('get first and last digits from a string', () => {
      const line = '1aba2ca7'

      expect(17).toEqual(extractFirstAndLastDigit(line))
    })

    it.each([
      { line: '1abc2', number: 12 },
      { line: 'pqr3stu8vwx', number: 38 },
      { line: 'a1b2c3d4e5f', number: 15 },
      { line: 'treb7uchet', number: 77 },
    ])('parses number from lines', ({ number, line }) => {
      expect(extractFirstAndLastDigit(line)).toBe(number)
    })

    it('parses all lines and sums it up', () => {
      const lines = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
      expect(sumLinesNumbers(lines)).toBe(142)
    })

    it('parses all lines in a file', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/01/input.txt').toString().split('\n')

      console.log(`Exercise 1 - Part One: The sum is ${sumLinesNumbers(lines)}`)
    })
  })

  describe('Part Two', () => {
    it.each([
      { line: 'two1nine', number: 29 },
      { line: 'eightwothree', number: 83 },
      { line: 'abcone2threexyz', number: 13 },
      { line: 'xtwone3four', number: 24 },
      { line: '4nineeightseven2', number: 42 },
      { line: 'zoneight234', number: 14 },
      { line: '7pqrstsixteen', number: 76 },
      { line: 'eighthree', number: 83 },
    ])('parses number from lines', ({ number, line }) => {
      expect(extractFirstAndLastDigitOrWord(line)).toBe(number)
    })

    it('parses all lines and sums it up', () => {
      const lines = [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ]
      expect(sumLinesNumbersDigitOrWord(lines)).toBe(281)
    })

    it('parses all lines in a file', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/01/input.txt').toString().split('\n')

      console.log(`Exercise 1 - Part Two: The sum is ${sumLinesNumbersDigitOrWord(lines)}`)
    })
  })
})
