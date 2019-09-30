import del from 'del'
import config from '../config/config'
import * as fs from 'fs'
import * as path from 'path'
import {Atbash} from '../cyphers/atbash'
import {ShiftOperator} from '../operations/shiftOperator'
import {writeFile} from '../utils/fileUtils'

export class ShiftedAtbashTranslator {
    outFolder = 'shiftedAtBash'

    constructor() {
        this.folder = path.join(config.solver.outputDataFolder, this.outFolder)
        this.atbash = new Atbash()
        this.shiftOperator = new ShiftOperator()
    }

    setupFolder = async () => {
        await del([this.folder])

        fs.mkdirSync(this.folder)
    }

    apply = async (fileData) => {

        await this.setupFolder()

        const atbashResult = this.atbash.apply(fileData)

        for (const shift of config.translators.shiftedAtbash.shiftsToPerform) {
            const result = this.shiftOperator.apply(atbashResult, shift)
            const filePath = path.join(this.outFolder, `shiftBy${shift}`)

            writeFile(filePath, result)
        }
    }
}