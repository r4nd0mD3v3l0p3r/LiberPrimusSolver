import * as path from "path"
import config from '../config/config'
import {setupFolder, writeFile} from '../utils/fileUtils'
import {LiberPrimusSplitter} from '../core/liberPrimusSplitter'
import {Vigenere} from '../ciphers/vigenere'

export class VigenereTranslator {
    outFolder = 'vigenere'

    constructor() {
        this.folder = path.join(config.solver.outputDataFolder, this.outFolder)
        this.liberPrimusSplitter = new LiberPrimusSplitter()
        this.splitBy = config.translators.vigenere.splitLiberPrimusBy
    }

    apply = async (fileData) => {
        await setupFolder(this.folder)

        const splitterChar = this.liberPrimusSplitter.getSplitterChar(this.splitBy)

        for (const keyObject of config.translators.vigenere.keys) {
            const {key, fileName} = keyObject
            let result = ''

            for (const chunk of this.liberPrimusSplitter.split(fileData, this.splitBy)) {
                const vigenere = new Vigenere(key)

                const decryptedChunk = vigenere.apply(chunk)

                result = result.concat(decryptedChunk).concat(splitterChar)
            }

            const filePath = path.join(this.outFolder, fileName)

            writeFile(filePath, result)
        }
    }

}