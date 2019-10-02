import config from '../config/config'
import * as path from 'path'
import {Atbash} from '../ciphers/atbash'
import {Shift} from '../ciphers/shift'
import {setupFolder, writeFile} from '../utils/fileUtils'

export class ShiftedAtbashTranslator {
    outFolder = 'shiftedAtBash'

    constructor() {
        this.folder = path.join(config.solver.outputDataFolder, this.outFolder)
        this.atbash = new Atbash()
        this.shiftOperator = new Shift()
    }

    apply = async (fileData) => {

        await setupFolder(this.folder)

        const atbashResult = this.atbash.apply(fileData)

        for (const shift of config.translators.shiftedAtbash.shiftsToPerform) {
            const result = this.shiftOperator.apply(atbashResult, shift)
            const filePath = path.join(this.outFolder, `shiftBy${shift}`)

            writeFile(filePath, result)
        }
    }
}