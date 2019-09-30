import {RunesAlphabet} from '../core/runesAlphabet'

export class ShiftOperator {
    constructor() {
        if (!!ShiftOperator.instance) {
            return ShiftOperator.instance
        }

        ShiftOperator.instance = this

        this.runesAlpabeth = new RunesAlphabet()

        return this
    }

    apply = (text, shift) => {

        let result = ''

        for (const char of text) {
            result = result.concat(this.innerApply(char, shift))
        }

        return result
    }

    innerApply = (char, shift) => {
        if (!this.runesAlpabeth.isRune(char))
            return char

        const runeToShift = this.runesAlpabeth.runes.get(char)

        const {decimal} = runeToShift

        let newIndex = (decimal + shift)

        if (newIndex < 0) {
            newIndex = (newIndex * -1) % this.runesAlpabeth.runesCount
            newIndex = newIndex == 0 ? 0 : this.runesAlpabeth.runesCount - newIndex

        } else {
            newIndex = newIndex % this.runesAlpabeth.runesCount
        }

        return this.runesAlpabeth.runeAlphabet[newIndex]
    }
}