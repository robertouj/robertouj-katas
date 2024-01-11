import { s } from 'vitest/dist/reporters-LLiOBu3g'

export type SchemaNumber = {
  value: number
  position: number
  row: number
}

export const fillArrayWithInput = (input: string[]) => {
  return input.map((line) => line.split(''))
}

export const extractNumbersFromSchema = (schema: string[]) => {
  const numbersFromSchema: SchemaNumber[] = []

  schema.forEach((line, index) => {
    const matches = [...line.matchAll(/\d+/g)].map((match) => {
      const firstRow = index === 0
      const lastRow = index === schema.length - 1

      numbersFromSchema.push({
        value: parseInt(match[0]),
        position: match.index,
        row: index,
      })
    })
  })
  return numbersFromSchema
}

export const extractSymbolsFromSchema = (schema: string[]) => {
  const symbolsFromSchema: {
    symbol: string
    position: number
    row: number
  }[] = []

  schema.forEach((line, index) => {
    // match all non-word characters except dots
    const matches = [...line.matchAll(/[^0-9^a-z^A-Z.]/g)].map((match) => {
      const firstRow = index === 0
      const lastRow = index === schema.length - 1

      symbolsFromSchema.push({
        symbol: match[0],
        position: match.index,
        row: index,
      })
    })
  })
  return symbolsFromSchema
}

export const isPartNumber = (number: SchemaNumber, schema: string[]) => {
  const symbols = extractSymbolsFromSchema(schema)
  const schemaArray = fillArrayWithInput(schema)
  const numberNumCyphers = number.value.toString().length
  const numColumns = schemaArray[0].length
  const numRows = schemaArray.length
  const startRow = number.row === 0 ? 0 : number.row - 1
  const endRow = number.row === numRows - 1 ? numRows - 1 : number.row + 1
  const startColumn = number.position === 0 ? 0 : number.position - 1
  const endColumn =
    number.position + numberNumCyphers > numColumns ? numColumns - 1 : number.position + numberNumCyphers

  for (let i = startRow; i <= endRow; i++) {
    const symbolsInLine = symbols.filter((symbol) => symbol.row === i)

    for (let j = 0; j < symbolsInLine.length; j++) {
      const symbolPosition = symbolsInLine[j].position
      const isSymbolBetweenLimits = startColumn <= symbolPosition && symbolPosition <= endColumn
      if (isSymbolBetweenLimits) return { number, symbol: symbolsInLine[j] }
    }
  }
}

export const sumPartNumbers = (schema: string[]) => {
  const numbers = extractNumbersFromSchema(schema)
  const symbols = extractSymbolsFromSchema(schema)
  const partNumbers = numbers.filter((number) => isPartNumber(number, schema))

  return partNumbers.reduce((acc, curr) => acc + curr.value, 0)
}

export const sumGearRatios = (schema: string[]) => {
  const numbers = extractNumbersFromSchema(schema)
  const symbols = extractSymbolsFromSchema(schema)
  const partNumbersWithSymbols = numbers.map((number) => isPartNumber(number, schema))
  const symbolsWithPartNumbers: { key: string; count: number; ratio: number }[] = []

  partNumbersWithSymbols
    .filter((partNumberWithSymbol) => partNumberWithSymbol !== undefined)
    .forEach((partNumberWithSymbol) => {
      const key = `${partNumberWithSymbol?.symbol.row}-${partNumberWithSymbol?.symbol.position}`
      const index = symbolsWithPartNumbers.findIndex((item) => item.key === key)
      const isFirstOccurenceOfSymbol = index === -1

      if (partNumberWithSymbol?.number.value !== undefined) {
        if (isFirstOccurenceOfSymbol) {
          symbolsWithPartNumbers.push({ key, count: 1, ratio: partNumberWithSymbol.number.value })
        } else {
          symbolsWithPartNumbers[index].count++
          symbolsWithPartNumbers[index].ratio =
            symbolsWithPartNumbers[index].ratio === 0
              ? partNumberWithSymbol.number.value
              : symbolsWithPartNumbers[index].ratio * partNumberWithSymbol.number.value
        }
      }
    })

  return symbolsWithPartNumbers.reduce((acc, curr) => acc + (curr.count === 2 ? curr.ratio : 0), 0)
}
