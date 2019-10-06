import * as math from 'mathjs'
import {RunesAlphabet} from '../core/runesAlphabet'
import {Logger} from '../utils/logger'

export class HillCipher {
    fillerRune = 'ᛉ'

    constructor(matrix, isDecryptionMatrix) {
        this.runesAlphabet = new RunesAlphabet()
        this.logger = new Logger()
        this.matrix = !isDecryptionMatrix ? this.computeInverse(matrix) : math.matrix(matrix)
        this.matrixSize = this.matrix.size()[0]

        this.logger.log('HillCipher', `Using matrix: ${this.matrix}`)
    }

    computeInverse = (matrix) => {
        const det = math.round(math.det(matrix))

        if (det === 0) {
            this.logger.log('HillCipher', `The given matrix is not invertible, det=${det}`)
            throw 'Cannot invert matrix'
        } else if (det === 29) {
            this.logger.log('HillCipher', `The matrix det is equal to the mod value`)
            throw 'Cannot decrypt using Hill'
        }

        this.logger.log('HillCipher', `Calculating A^-1`)
        const candidateMatrix = math.matrix(matrix)

        console.log(candidateMatrix)
        const inv = math.inv(candidateMatrix)
        const invMulDet = math.multiply(inv, det)

        const modInverse = math.mod(math.multiply(invMulDet, this.modInverse(det)), this.runesAlphabet.runesCount)

        return math.round(modInverse)
    }

    apply = text => {
        let result = ''
        let charactersRead = []
        let runesRead = []

        for (const char of text) {
            if (runesRead.length === this.matrixSize) {
                result = result.concat(this.decrypt(charactersRead, runesRead))
                charactersRead = []
                runesRead = []
            }

            charactersRead.push(char)

            if (this.runesAlphabet.isRune(char)) {
                runesRead.push(char)
            }
        }

        if (runesRead.length !== 0) {
            if (runesRead.length !== this.matrixSize) {
                while (runesRead.length !== this.matrixSize)
                    runesRead = runesRead.concat(this.fillerRune)
            }
            result = result.concat(this.decrypt(charactersRead, runesRead))
        } else if (charactersRead.length !== 0) {
            for (const char of charactersRead)
                result = result.concat(char)
        }

        return result
    }

    decrypt = (charactersRead, runesRead) => {
        const runesValues = []

        for (const runeValue of runesRead) {
            runesValues.push([this.runesAlphabet.runes.get(runeValue).decimal])
        }

        const decryptedRunesMatrix = math.multiply(this.matrix, runesValues)
        const decryptedRunes = []

        decryptedRunesMatrix.forEach((value, index, matrix) => {
            decryptedRunes.push(value % this.runesAlphabet.runesCount)
        })

        let result = ''

        for (const charRead of charactersRead) {
            if (this.runesAlphabet.isRune(charRead)) {
                const runeDecimal = decryptedRunes.shift()
                const decryptedRune = this.runesAlphabet.runeAlphabet[runeDecimal]

                result = result.concat(decryptedRune)
            } else {
                result = result.concat(charRead)
            }
        }

        return result
    }

    modInverse = a => {
        a %= this.runesAlphabet.runesCount;
        for (let x = 1; x < this.runesAlphabet.runesCount; x++) {
            if ((a * x) % this.runesAlphabet.runesCount == 1) {
                return x
            }
        }
    }
}