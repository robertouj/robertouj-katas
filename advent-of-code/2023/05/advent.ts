type Range = { destinationStart: number; sourceStart: number; length: number }

export type Almanac = {
  seeds: number[]
  groups: { name: string; ranges: Range[] }[]
}

export const extractAlmanacElements = (lines: string[]): Almanac | undefined => {
  let almanac: Almanac = { seeds: [], groups: [] }

  const seeds = lines[0]
    .split(' ')
    .map(Number)
    .filter((value) => !isNaN(value))

  seeds.forEach((seed) => almanac.seeds.push(seed))

  let nextGroupName = ''
  lines.slice(1).forEach((line, index) => {
    if (line === '') return
    if (line.includes(' map:')) {
      nextGroupName = line.split(' map:')[0]
      almanac.groups.push({ name: nextGroupName, ranges: [] })
      return
    }
    // find in almanac the group with the name and add the ranges
    const ranges = line.split(' ').map(Number)
    almanac.groups
      .find((group) => group.name === nextGroupName)
      ?.ranges.push({ destinationStart: ranges[0], sourceStart: ranges[1], length: ranges[2] })
    return
  })

  return almanac
}

export const extractSeedLocation = (seed: number, almanac: Almanac): number | undefined => {
  let location = seed

  almanac.groups.forEach((group) =>
    group.ranges.some(
      (range, index) => isSourceNumberInRange(location, range) && (location = getDestinationNumber(location, range)),
    ),
  )
  return location
}

const isSourceNumberInRange = (sourceNumber: number, range: Range): boolean =>
  sourceNumber >= range.sourceStart && sourceNumber <= range.sourceStart + range.length - 1

const getDestinationNumber = (sourceNumber: number, range: Range): number =>
  range.destinationStart + sourceNumber - range.sourceStart

export const getLowerLocationNumber = (almanac: Almanac): number => {
  let lower: number | undefined
  almanac.seeds.forEach((seed) => {
    const location = extractSeedLocation(seed, almanac)
    if (!lower || (location && location < lower)) lower = location
  })
  return lower || 0
}
