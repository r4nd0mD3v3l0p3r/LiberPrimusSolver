import * as fs from 'fs'
import * as path from 'path'
import 'regenerator-runtime/runtime'
import {Logger} from '../utils/logger'
import config from '../config/config'
import {Atbash} from '../ciphers/atbash'
import {readFileLines, setupOutputFolder, writeFile} from '../utils/fileUtils'
import {Shift} from '../ciphers/shift'
import {Vigenere} from '../ciphers/vigenere'

export class LiberPrimusSolver {
    constructor(fullPath = config.solver.dataFolder, fileToTranslate = config.solver.fileToTranslate) {
        this.filePath = path.join(fullPath, fileToTranslate)
        this.logger = new Logger()
        this.atbash = new Atbash()
        this.shift = new Shift()
        this.tasksFile = path.join(fullPath, config.solver.tasksFile)
    }

    fileData = () => fs.readFileSync(this.filePath, 'utf-8')

    run = async () => {
        this.logger.log('LiberPrimusSolver', `Processing ${this.filePath}`)

        setupOutputFolder()

        await this.performTasks()

        this.logger.log('LiberPrimusSolver', `Done processing ${this.filePath}`)
    }

    performTasks = async () => {
        let fileData = this.fileData()

        for (const line of readFileLines(this.tasksFile)) {
            try {
                const taskConfiguration = JSON.parse(line)

                for (const task of taskConfiguration.pipeline) {
                    const {cipher} = task

                    if (cipher === 'direct') {
                    } else if (cipher === 'atbash') {
                        fileData = this.atbash.apply(fileData)
                    } else if (cipher === 'shift') {
                        const {by} = task

                        fileData = this.shift.apply(fileData, by)
                    } else if (cipher === 'vigenere') {
                        const {key} = task
                        const vigenere = new Vigenere(key)

                        fileData = vigenere.apply(fileData)
                    } else {
                        throw 'unsupported or malformed cipher'
                    }
                }

                writeFile(taskConfiguration.outputFileName, fileData)

            } catch (e) {
                this.logger.log('LiberPrimusSolver', `Encountered unsopported/malformed task: ${line}`)
            }
        }
    }
}