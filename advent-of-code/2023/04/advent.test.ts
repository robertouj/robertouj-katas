import { describe, it, expect } from 'vitest'
import { takeNumbersAndWinners, sumPointsFromLine, sumPoints, sumWinnersFromLine, sumScratchcards } from './advent'
import fs from 'node:fs'

describe('Advent test suite 2023 - 03', () => {
  const lines = [
    { text: 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53', points: 8, winners: 4 },
    { text: 'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19', points: 2, winners: 2 },
    { text: 'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1', points: 2, winners: 2 },
    { text: 'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', points: 1, winners: 1 },
    { text: 'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36', points: 0, winners: 0 },
    { text: 'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11', points: 0, winners: 0 },
  ]

  const points = [8, 2, 2, 1, 0, 0]

  describe('Part One', () => {
    it('take the numbers and winers from a line', () => {
      expect(takeNumbersAndWinners(lines[0].text)).toEqual({
        numbers: [41, 48, 83, 86, 17],
        winners: [83, 86, 6, 31, 17, 9, 48, 53],
      })
    })

    it.each(lines)('sum points from line  %#: %j', (line) => {
      expect(sumPointsFromLine(line.text)).toEqual(line.points)
    })

    it('sum the values of all part numbers', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/04/input.txt').toString().split('\n')

      console.log(`Exercise 4 - Part One: The sum of points is ${sumPoints(lines)}`)
    })
  })

  describe('Part Two', () => {
    it.each(lines)('should return the winners from each line', (line) => {
      expect(sumWinnersFromLine(line.text)).toEqual(line.winners)
    })

    it('should return the sum of scratchcards', () => {
      expect(sumScratchcards(lines.map(line => line.text))).toEqual(30)
    })

    it('sum the total of scratchcards', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/04/input.txt').toString().split('\n')
      console.log(`Exercise 4 - Part Two: The sum of all scratchcards is ${sumScratchcards(lines)}`)
    })
  })
})
