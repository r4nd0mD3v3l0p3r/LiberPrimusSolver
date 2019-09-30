import config from '../config/config'
import * as path from 'path'
import * as fs from 'fs'
import {Logger} from '../utils/logger'
import {ShiftedAtBash} from '../cyphers/shiftedAtBash'
import del from 'del'
import {RunesAlphabet} from './runesAlphabet'

export class ShiftedAtBashTranslator {
    const
    OutFolder = 'shiftedAtBash'


    constructor(fileData) {
        this.folder = path.join(config.solver.outputDataFolder, this.OutFolder)
        this.fileData = fileData
        this.shiftsToPerform = config.cyphers.shiftedAtBash.shiftsToPerform
        this.runesAlphabet = new RunesAlphabet()
        this.logger = new Logger()
    }

    setupFolder = async () => {
        await del([this.folder])

        fs.mkdirSync(this.folder)
    }

    translate = async () => {

        await this.setupFolder()

        for (const shiftToPerform of config.cyphers.shiftedAtBash.shiftsToPerform) {
            this.logger.log('ShiftedAtBashTranslator', 'Translation started')
            const translatedData = new ShiftedAtBash(shiftToPerform).apply(this.fileData)
            const humanReadableTranslatedData = this.runesAlphabet.translate(translatedData)

            const fileName = path.join(this.folder, `shiftBy${shiftToPerform}.txt`)

            const fileStream = fs.createWriteStream(fileName, {flags: 'a'})
            fileStream.write(humanReadableTranslatedData)
            fileStream.close()

            this.logger.log('ShiftedAtBashTranslator', `Translated using a shift value of ${shiftToPerform}`)
        }

        this.logger.log('ShiftedAtBashTranslator', 'Translation completed')

    }
}