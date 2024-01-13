export const takeNumbersAndWinners = (line: string): { numbers: number[]; winners: number[] } => {
  if (line === '') return { numbers: [], winners: [] }
  const [winners, numbers] = line.split(': ')[1].split(' | ')

  return {
    numbers: convertToNumbers(winners),
    winners: convertToNumbers(numbers),
  }
}

const convertToNumbers = (str: string) =>
  str.split(' ').reduce((acc: number[], curr: string) => {
    if (curr !== '') {
      acc.push(Number(curr))
    }
    return acc
  }, [])

export const sumPointsFromLine = (line: string): number => {
  const { numbers, winners } = takeNumbersAndWinners(line)
  const exponent =
    numbers.reduce((acc: number, curr: number) => {
      if (winners.includes(curr)) {
        acc++
      }
      return acc
    }, 0) - 1

  return exponent >= 0 ? Math.pow(2, exponent) : 0
}

export const sumPoints = (lines: string[]): number =>
  lines.reduce((acc: number, curr: string) => acc + sumPointsFromLine(curr), 0)

export const sumWinnersFromLine = (line: string): number => {
  const { numbers, winners } = takeNumbersAndWinners(line)
  return numbers.reduce((acc: number, curr: number) => {
    if (winners.includes(curr)) {
      acc++
    }
    return acc
  }, 0)
}

export const sumScratchcards = (lines: string[]): number => {
  const scratchcards = lines
    .filter((line) => line !== '')
    .map((line) => ({ winners: sumWinnersFromLine(line), count: 1 }))

  scratchcards.forEach((scratchcard, index) => {
    const init = index + 1
    const end = index + scratchcard.winners
    const repetitions = scratchcard.count
    for (let i = 0; i < repetitions; i++) {
      for (let j = init; j <= end; j++) {
        if (j < scratchcards.length) scratchcards[j].count++
      }
    }
  })

  return scratchcards.reduce((acc, curr) => acc + curr.count, 0)
}
