import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import {
  extractGameIdFromLine,
  extractSetsFromLine,
  extractPossiblesFromLine,
  sumOfPossibleIds,
  extractFewerCubesFromLine,
  extractPowerFromLine,
  sumPowerFromLines,
} from './advent'
import isEqual from 'lodash.isequal'

describe('Advent test suite 2023 - 02', () => {
  const example = [
    {
      line: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      id: 1,
      sets: [
        { red: 4, green: 0, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { red: 0, green: 2, blue: 0 },
      ],
      possible: true,
      fewer: { red: 4, green: 2, blue: 6 },
      power: 48,
    },
    {
      line: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      id: 2,
      sets: [
        { red: 0, green: 2, blue: 1 },
        { red: 1, green: 3, blue: 4 },
        { red: 0, green: 1, blue: 1 },
      ],
      possible: true,
      fewer: { red: 1, green: 3, blue: 4 },
      power: 12,
    },
    {
      line: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      id: 3,
      sets: [
        { red: 20, green: 8, blue: 6 },
        { red: 4, green: 13, blue: 5 },
        { red: 1, green: 5, blue: 0 },
      ],
      possible: false,
      fewer: { red: 20, green: 13, blue: 6 },
      power: 1560,
    },
    {
      line: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      id: 4,
      sets: [
        { red: 3, green: 1, blue: 6 },
        { red: 6, green: 3, blue: 0 },
        { red: 14, green: 3, blue: 15 },
      ],
      possible: false,
      fewer: { red: 14, green: 3, blue: 15 },
      power: 630,
    },
    {
      line: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
      id: 5,
      sets: [
        { red: 6, green: 3, blue: 1 },
        { red: 1, green: 2, blue: 2 },
      ],
      possible: true,
      fewer: { red: 6, green: 3, blue: 2 },
      power: 36,
    },
  ]

  describe('Part One', () => {
    it.each(example)('parses game ID from lines', ({ line, id }) => {
      expect(extractGameIdFromLine(line)).toBe(id)
    })

    it.each(example)('parses subsets of cubes from lines', ({ line, sets }) => {
      expect(isEqual(extractSetsFromLine(line), sets)).toEqual(true)
    })

    it.each(example)("determines if a game's sets are possible", ({ line, possible }) => {
      expect(extractPossiblesFromLine(line)).toBe(possible)
    })

    it('sum all IDs of the possible lines', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/02/input.txt').toString().split('\n')

      console.log(`Exercise 2 - Part One: The sum of possible IDs is ${sumOfPossibleIds(lines)}`)
    })
  })

  describe('Part Two', () => {
    it.each(example)(
      'get fewer number of cubes of each color in a line to make the game possible',
      ({ line, fewer }) => {
        expect(isEqual(extractFewerCubesFromLine(line), fewer)).toBe(true)
      },
    )

    it.each(example)('get the power of a game', ({ line, power }) => {
      expect(extractPowerFromLine(line)).toBe(power)
    })

    it('sum the power of sets of the possible lines', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/02/input.txt').toString().split('\n')

      console.log(`Exercise 2 - Part Two: The sum of power is ${sumPowerFromLines(lines)}`)
    })
  })
})
