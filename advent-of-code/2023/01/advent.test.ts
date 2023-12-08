import { describe, it, expect } from 'vitest'
import { combineFirstLastDigit, sumLinesNumbers } from './advent'
import fs from 'node:fs'

describe('Advent test suite 2023 - 01', () => {
  it.each([
    { line: '1abc2', number: 12 },
    { line: 'pqr3stu8vwx', number: 38 },
    { line: 'a1b2c3d4e5f', number: 15 },
    { line: 'treb7uchet', number: 77 },
  ])('parses number from lines', ({ number, line }) => {
    expect(combineFirstLastDigit(line)).toBe(number)
  })

  it('parses all lines and sums it up', () => {
    const lines = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']
    expect(sumLinesNumbers(lines)).toBe(142)
  })

  it('parses all lines in a file', () => {
    const lines = fs.readFileSync("./advent-of-code/2023/01/input.txt").toString().split("\n")
    console.log(sumLinesNumbers(lines))
  })
})
