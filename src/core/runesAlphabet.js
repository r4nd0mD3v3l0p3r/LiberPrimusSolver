import {Logger} from '../utils/logger'

export class RunesAlphabet {
    runeAlphabet = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚩ', 'ᚱ', 'ᚳ', 'ᚷ', 'ᚹ', 'ᚻ', 'ᚾ', 'ᛁ', 'ᛄ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛝ', 'ᛟ', 'ᛞ', 'ᚪ', 'ᚫ', 'ᚣ', 'ᛡ', 'ᛠ']

    runes = new Map([
        ['ᚠ', {rune: 'ᚠ', decimal: 0, letter: 'F'}],
        ['ᚢ', {rune: 'ᚢ', decimal: 1, letter: '[V,U]'}],
        ['ᚦ', {rune: 'ᚦ', decimal: 2, letter: 'TH'}],
        ['ᚩ', {rune: 'ᚩ', decimal: 3, letter: 'O'}],
        ['ᚱ', {rune: 'ᚱ', decimal: 4, letter: 'R'}],
        ['ᚳ', {rune: 'ᚳ', decimal: 5, letter: '[C,K]'}],
        ['ᚷ', {rune: 'ᚷ', decimal: 6, letter: 'G'}],
        ['ᚹ', {rune: 'ᚹ', decimal: 7, letter: 'W'}],
        ['ᚻ', {rune: 'ᚻ', decimal: 8, letter: 'H'}],
        ['ᚾ', {rune: 'ᚾ', decimal: 9, letter: 'N'}],
        ['ᛁ', {rune: 'ᛁ', decimal: 10, letter: 'I'}],
        ['ᛄ', {rune: 'ᛄ', decimal: 11, letter: 'J'}],
        ['ᛇ', {rune: 'ᛇ', decimal: 12, letter: 'EO'}],
        ['ᛈ', {rune: 'ᛈ', decimal: 13, letter: 'P'}],
        ['ᛉ', {rune: 'ᛉ', decimal: 14, letter: 'X'}],
        ['ᛋ', {rune: 'ᛋ', decimal: 15, letter: '[S,Z]'}],
        ['ᛏ', {rune: 'ᛏ', decimal: 16, letter: 'T'}],
        ['ᛒ', {rune: 'ᛒ', decimal: 17, letter: 'B'}],
        ['ᛖ', {rune: 'ᛖ', decimal: 18, letter: 'E'}],
        ['ᛗ', {rune: 'ᛗ', decimal: 19, letter: 'M'}],
        ['ᛚ', {rune: 'ᛚ', decimal: 20, letter: 'L'}],
        ['ᛝ', {rune: 'ᛝ', decimal: 21, letter: '[NG,ING]'}],
        ['ᛟ', {rune: 'ᛟ', decimal: 22, letter: 'OE'}],
        ['ᛞ', {rune: 'ᛞ', decimal: 23, letter: 'D'}],
        ['ᚪ', {rune: 'ᚪ', decimal: 24, letter: 'A'}],
        ['ᚫ', {rune: 'ᚫ', decimal: 25, letter: 'AE'}],
        ['ᚣ', {rune: 'ᚣ', decimal: 26, letter: 'Y'}],
        ['ᛡ', {rune: 'ᛡ', decimal: 27, letter: '[IA,IO]'}],
        ['ᛠ', {rune: 'ᛠ', decimal: 28, letter: 'EA'}],
    ])

    constructor() {
        if (!!RunesAlphabet.instance) {
            return RunesAlphabet.instance
        }

        RunesAlphabet.instance = this
        this.logger = new Logger()

        return this
    }

    isRune = candidate => this.runes.has(candidate)

    shift = (rune, shift) => {
        const runeToShift = this.runes.get(rune)

        const {decimal} = runeToShift

        const shiftedIndex = (decimal + shift) % 29

        return this.runeAlphabet[shiftedIndex]
    }

    translate = text =>
    {
        let result = ''

        for (const char of text) {
            result = result.concat(this.isRune(char) ? this.runes.get(char).letter : char)
        }

        return result
    }
}