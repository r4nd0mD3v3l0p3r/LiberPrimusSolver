import {RunesAlphabet} from './runesAlphabet'

import 'regenerator-runtime/runtime'

it('recognises that ᚣ is a rune', () => {
    const input = 'ᚣ'

    const runesTranslator = new RunesAlphabet()

    expect(runesTranslator.isRune(input)).toEqual(true)
})

it('recognises that 6 is not  a rune', () => {
    const input = '6'

    const runesTranslator = new RunesAlphabet()

    expect(runesTranslator.isRune(input)).toEqual(false)
})

it('when asked to shift (ᚻ,4) returns ᛇ', () => {
    const runesTranslator = new RunesAlphabet()

    expect(runesTranslator.shift('ᚻ', 4)).toEqual('ᛇ')
})

it('when asked to shift (ᛠ,2) returns ᚢ', () => {
    const runesTranslator = new RunesAlphabet()

    expect(runesTranslator.shift('ᛠ', 2)).toEqual('ᚢ')
})