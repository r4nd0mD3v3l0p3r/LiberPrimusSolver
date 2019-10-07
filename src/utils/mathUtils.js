import * as math from 'mathjs'

export const areCoprimes = (a, b) => {
    const absA = math.abs(a)

    if (absA === 0 || b === 0)
        return false
    else if (absA === b)
        return false
    else {
        const gcd = (absA > b) ? math.gcd(absA - b, b) : math.gcd(absA, b - a)

        return gcd === 1
    }
}

export const modInverse = (a, m) => {
    const xgcdResult = math.xgcd(math.abs(a), m).valueOf()

    return xgcdResult[1]
}