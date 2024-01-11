import { describe, it, expect } from 'vitest'
import {
  extractNumbersFromSchema,
  extractSymbolsFromSchema,
  fillArrayWithInput as fillArrayWithInput,
  isPartNumber,
  sumGearRatios,
  sumPartNumbers,
} from './advent'
import fs from 'node:fs'

describe('Advent test suite 2023 - 03', () => {
  const schema = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..',
  ]
  const sumGearRatiosExample = 467835;

  describe('Part One', () => {
    it('should fill an array with rows and columns from the schema', () => {
      const result = fillArrayWithInput(schema)

      expect(schema[0][4]).toEqual('.')
      expect(schema[1][3]).toEqual('*')
      expect(schema[8][3]).toEqual('$')
      expect(schema[9][1]).toEqual('6')
    })

    it('should return the numbers with position and row from the schema', () => {
      const result = extractNumbersFromSchema(schema)

      expect(result[0].value).toEqual(467)
      expect(result[9].row).toEqual(9)
      expect(result[2].position).toEqual(2)
    })

    it('should return the symbols with position and row from the schema', () => {
      const result = extractSymbolsFromSchema(schema)

      expect(result[0].symbol).toEqual('*')
    })

    it('should return if a number is a part number', () => {
      const numbers = extractNumbersFromSchema(schema)

      expect((isPartNumber(numbers[0], schema))?.number.value).toEqual(numbers[0].value)
      expect(isPartNumber(numbers[5], schema)).not.toBeDefined()
      expect((isPartNumber(numbers[9], schema))?.number.value).toEqual(numbers[9].value)
    })

    it('sum the values of all part numbers', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/03/input.txt').toString().split('\n')

      console.log(`Exercise 1 - Part Three: The sum of part numbers is ${sumPartNumbers(lines)}`)
    })
  })

  describe('Part Two', () => {
    it('should return the sum of gear ratios of the example', () => {
      expect(sumGearRatios(schema)).toEqual(sumGearRatiosExample)
    })

    it('sum the values of all gear ratios', () => {
      const lines = fs.readFileSync('./advent-of-code/2023/03/input.txt').toString().split('\n')

      console.log(`Exercise 2 - Part Three: The sum of all gear ratios is ${sumGearRatios(lines)}`)
    })
  })
})
