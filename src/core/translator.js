import * as fs from 'fs'
import * as path from 'path'
import 'regenerator-runtime/runtime'
import {Logger} from '../utils/logger'
import config from '../config/config'
import {Atbash} from '../cyphers/atbash'
import {RunesAlphabet} from './runesAlphabet'
import {ShiftedAtbashTranslator} from '../translators/shiftedAtbashTranslator'
import {writeFile} from '../utils/fileUtils'

export class Translator {
    constructor(fullPath = config.solver.dataFolder, fileToTranslate = config.solver.fileToTranslate) {
        this.filePath = path.join(fullPath, fileToTranslate)
        this.logger = new Logger()
        this.atbash = new Atbash()
    }

    fileData = () => fs.readFileSync(this.filePath, 'utf-8')

    translate = async () => {
        this.logger.log('Translator', `Translating ${this.filePath}`)

        await this.applyTranslator()

        this.logger.log('Translator', `Done translating ${this.filePath}`)
    }

    applyTranslator = async () => {
        const fileData = this.fileData()
        const translatorToApply = config.solver.translatorToApply

        this.logger.log('Translator', `Selected translator: ${translatorToApply}`)

        if (translatorToApply === 'direct') {
            writeFile('direct', fileData)
        } else if (translatorToApply === 'atbash') {
            writeFile('atbash', this.atbash.apply(fileData))
        } else if (translatorToApply === 'shiftedAtbash') {
            const translator = new ShiftedAtbashTranslator()

            await translator.apply(fileData)
        } else
            throw `Unsupported translator: ${translatorToApply}`
    }
}