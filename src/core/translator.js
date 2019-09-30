import * as fs from 'fs'
import * as path from 'path'
import 'regenerator-runtime/runtime'
import {Logger} from '../utils/logger'
import config from '../config/config'
import {ShiftedAtBashTranslator} from './shiftedAtBashTranslator'

export class Translator {
    constructor(fullPath = config.solver.dataFolder, fileToTranslate = config.solver.fileToTranslate) {
        this.filePath = path.join(fullPath, fileToTranslate)
        this.logger = new Logger()
    }

    fileData = () => fs.readFileSync(this.filePath, 'utf-8')

    translate = async () => {
        this.logger.log('Translator', `Translating ${this.filePath}`)

        const fileData = this.fileData()
        const selectedCypher = config.solver.methodToUse

        if (selectedCypher === 'shiftedAtBash') {
            const translator = new ShiftedAtBashTranslator(fileData)

            await translator.translate()
        }

        this.logger.log('Translator', `Done translating ${this.filePath}`)
    }
}