import { als } from './als.js';
import express from 'express'

const app = express()
const port = 3000
let requestId = 0

class Logger {
    constructor(requestId) {
        this.requestId = requestId
    }

    info(message) {
        console.log(`[${this.requestId}] ${message}`)
    }
}

app.use((req, res, next) => {
    als.run(new Logger(++requestId), next)
})

app.get('/', (req, res) => {
    const log = als.getStore()
    log.info('logging with request id!')
    res.send(`[${log.requestId}] Hello World!`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
