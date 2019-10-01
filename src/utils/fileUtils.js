import config from '../config/config'
import * as path from 'path'
import * as fs from 'fs'
import {Logger} from '../utils/logger'
import {RunesAlphabet} from '../core/runesAlphabet'
import del from 'del'

const logger = new Logger()
const runesAlphabet = new RunesAlphabet()

export const writeFile = (fileName, data) => {
    const fullFilePath = path.join(config.solver.outputDataFolder, fileName)

    const runeFileStream = fs.createWriteStream(fullFilePath + '.rune.txt', {flags: 'w'})
    runeFileStream.write(data)
    runeFileStream.close()

    logger.log('FileUtils', `File created: ${fullFilePath}.rune.txt`)

    const englishData = runesAlphabet.translate(data)
    const fileStream = fs.createWriteStream(fullFilePath + '.txt', {flags: 'w'})
    fileStream.write(englishData)
    fileStream.close()

    logger.log('FileUtils', `File created: ${fullFilePath}.txt`)
}

export const setupFolder = async (folder) => {
    await del([folder])

    fs.mkdirSync(folder)
}