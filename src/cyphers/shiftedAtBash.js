import {Atbash} from './atbash'
import {RunesAlphabet} from '../core/runesAlphabet'

export class ShiftedAtBash {
    constructor(shift) {
        this.atBash = new Atbash()
        this.runesTranslator = new RunesAlphabet()

        this.shift = shift
    }

    apply = text => {
        let result = ''
        const atBash = this.atBash.apply(text)

        for (const char of atBash) {
            result = result.concat(this.decrypt(char))
        }

        return result
    }

    decrypt = text => {
        if (!this.runesTranslator.isRune(text))
            return text

        return this.runesTranslator.shift(text, this.shift)
    }


}