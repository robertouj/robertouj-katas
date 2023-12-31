export const extractGameIdFromLine = (line: string): number | undefined => {
  const matches = line.match(/Game (\d+):/)
  if (matches) {
    return Number(matches[1])
  }
}

type Color = 'red' | 'green' | 'blue'
type Set = Record<Color, number>

export const extractSetsFromLine = (line: string): Set[] | undefined => {
  const match = line.match(/(Game \d+:)(.*)/)

  if (match) {
    const lineOfSets = match[2].split(';')
    const sets = lineOfSets.map((set) => {
      const cubes: Set = { red: 0, green: 0, blue: 0 }

      set
        .trim()
        .split(',')
        .map((color) => {
          const colors = color.match(/(\d+) (\w+)/)

          if (colors) {
            cubes[colors[2] as Color] = Number(colors[1])
          }
        })

      return cubes
    })

    return sets
  }
}

export const extractPossiblesFromLine = (line: string): boolean => {
  const sets = extractSetsFromLine(line)
  const maxCubes = { red: 12, green: 13, blue: 14 }

  if (sets) {
    return sets.every((set) => {
      return Object.entries(set).every(([color, cubes]) => {
        return cubes <= maxCubes[color as Color]
      })
    })
  }

  return false
}

export const sumOfPossibleIds = (lines: string[]): number => {
  return lines
    .map((line) => extractPossiblesFromLine(line))
    .reduce((acc, curr, index) => {
      if (curr) {
        return acc + index + 1
      }

      return acc
    }, 0)
}

export const extractFewerCubesFromLine = (line: string): Set | undefined => {
  const sets = extractSetsFromLine(line)

  if (sets) {
    const fewer: Set = { red: 0, green: 0, blue: 0 }

    return sets.reduce((acc, curr) => {
      Object.entries(curr).forEach(([color, cubes]) => {
        if (cubes > fewer[color as Color]) {
          fewer[color as Color] = cubes
        }
      })

      return fewer
    }, {} as Set)
  }
}

export const extractPowerFromLine = (line: string): number => {
  const fewerCubes = extractFewerCubesFromLine(line)

  return fewerCubes ? Object.values(fewerCubes).reduce((acc, curr) => acc * curr, 1) : 0
}

export const sumPowerFromLines = (lines: string[]): number => {
  return lines.reduce((acc, curr) => acc + extractPowerFromLine(curr), 0)
}
