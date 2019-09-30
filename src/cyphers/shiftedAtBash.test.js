import {ShiftedAtBash} from './shiftedAtBash'
import {RunesAlphabet} from '../core/runesAlphabet'

it('translates ᚹ-ᚣᛠᚹᛟ. into A-COAN.', () => {
    const input = 'ᚹ-ᚣᛠᚹᛟ.'
    const runesTranslator = new RunesAlphabet()

    const shiftedAtBash = new ShiftedAtBash(3)

    const shiftedAtBashResult = shiftedAtBash.apply(input)

    expect(runesTranslator.translate(shiftedAtBashResult)).toEqual('A-[C,K]OAN.')
})