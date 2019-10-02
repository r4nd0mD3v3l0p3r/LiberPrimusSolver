import * as path from 'path'

export const DataPath = path.join(__dirname, '../', 'data')
export const OutputPath = path.join(__dirname, '../', 'data', 'output')
export const TasksFile = 'tasks.txt'

import {main} from './core/main'

main()