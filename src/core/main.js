import {Translator} from './translator'

export const main = async () => {
    const translator = new Translator()
    await translator.translate()
}