import { describe, it, expect } from 'vitest'
import { Almanac, extractAlmanacElements, extractSeedLocation, getLowerLocationNumber } from './advent'
import fs from 'node:fs'

// ranges: { destinationStart: number; sourceStart: number; length: number }
describe('Advent test suite 2023 - 05', () => {
  const lines = [
    'seeds: 79 14 55 13',
    '',
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
  ]

  const seedToLocation: Record<number, number> = {
    79: 82,
    14: 43,
    55: 86,
    13: 35,
  }

  describe('Part One', () => {
    it('extract the seeds  and groups from an input', () => {
      const result: Almanac | undefined = extractAlmanacElements(lines)
      expect(result?.seeds[3]).toEqual(13)
      expect(result?.groups[0].name).toEqual('seed-to-soil')
      expect(result?.groups[0].ranges[1].sourceStart).toEqual(50)
      expect(result?.groups[1].ranges[1].destinationStart).toEqual(37)
      expect(result?.groups[6].ranges[1].length).toEqual(4)
    })
    it.each(Object.keys(seedToLocation).map(Number))(`should return the location for seed %d`, (seed) => {
      const almanac = extractAlmanacElements(lines)

      expect(extractSeedLocation(seed, almanac || { seeds: [], groups: [] })).toEqual(seedToLocation[seed])
    })
    it('should return the lower destination number', () => {
      const almanac = extractAlmanacElements(lines)
      expect(getLowerLocationNumber(almanac || { seeds: [], groups: [] })).toEqual(35)
    })
    it('return the lowest location number', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/05/input.txt').toString().split('\n')
      const almanac = extractAlmanacElements(lines)
      console.log(
        `Exercise 5 - Part One: The lower location number is ${getLowerLocationNumber(
          almanac || { seeds: [], groups: [] },
        )}`,
      )
    })
  })

  // describe('Part Two', () => {
  //   it.each(lines)('should return the winners from each line', (line) => {
  //     expect(sumWinnersFromLine(line.text)).toEqual(line.winners)
  //   })

  //   it('should return the sum of scratchcards', () => {
  //     expect(sumScratchcards(lines.map(line => line.text))).toEqual(30)
  //   })

  //   it('sum the total of scratchcards', () => {
  //     const lines = fs.readFileSync('./advent-of-code/2023/04/input.txt').toString().split('\n')
  //     console.log(`Exercise 4 - Part Two: The sum of all scratchcards is ${sumScratchcards(lines)}`)
  //   })
  // })
})
