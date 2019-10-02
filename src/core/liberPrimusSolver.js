import * as fs from 'fs'
import * as path from 'path'
import 'regenerator-runtime/runtime'
import {Logger} from '../utils/logger'
import {Atbash} from '../ciphers/atbash'
import {readFileLines, setupOutputFolder, writeFile} from '../utils/fileUtils'
import {Shift} from '../ciphers/shift'
import {Vigenere} from '../ciphers/vigenere'
import {LiberPrimusSplitter} from './liberPrimusSplitter'
import {DataPath, TasksFile} from '../app'

export class LiberPrimusSolver {
    constructor() {
        this.logger = new Logger()
        this.atbash = new Atbash()
        this.shift = new Shift()
        this.tasksFile = path.join(DataPath, TasksFile)
        this.liberPrimusSplitter = new LiberPrimusSplitter()
    }

    fileData = fileName => fs.readFileSync(path.join(DataPath, fileName), 'utf-8')

    run = async () => {
        this.logger.log('LiberPrimusSolver', 'Liber Primus Solver started')

        setupOutputFolder()

        await this.performTasks()

        this.logger.log('LiberPrimusSolver', 'Liber Primus Solver stopped')
    }

    performTasks = async () => {

        for (const line of readFileLines(this.tasksFile)) {
            try {
                const taskConfiguration = JSON.parse(line)

                const {inputFileName, outputFileName} = taskConfiguration
                let fileData = this.fileData(inputFileName)

                for (const task of taskConfiguration.pipeline) {
                    const {cipher} = task

                    if (cipher === 'direct') {
                    } else if (cipher === 'atbash') {
                        fileData = this.atbash.apply(fileData)
                    } else if (cipher === 'shift') {
                        const {by} = task

                        fileData = this.shift.apply(fileData, Number(by))
                    } else if (cipher === 'vigenere') {
                        const {splitBy, key} = task
                        const splitterChar = this.liberPrimusSplitter.getSplitterChar(splitBy)
                        let result = ''

                        for (const chunk of this.liberPrimusSplitter.split(fileData, splitBy)) {
                            const vigenere = new Vigenere(key)

                            const decryptedChunk = vigenere.apply(chunk)

                            result = result.concat(decryptedChunk).concat(splitterChar)
                        }

                        fileData = result
                    } else {
                        throw 'unsupported or malformed cipher'
                    }
                }

                writeFile(outputFileName, fileData)
            } catch (e) {
                this.logger.log(e)
                this.logger.log('LiberPrimusSolver', `Encountered unsopported/malformed task: ${line}`)
            }
        }
    }
}