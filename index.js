import * as fs from 'node:fs/promises';
import { Readable } from 'node:stream';

/**
 * @readonly
 * @enum {string}
 */
const STATE = {
    ERROR: 'error',
    START: 'start'
}

/** @type {STATE} */
let state = STATE.START

console.log(state)

const inputFilePath = 'sample.js'

/** @type {fs.FileHandle} */
let inputFileHandle;

try {
    inputFileHandle = await fs.open(inputFilePath)
	
} catch (error) {
    console.log(error)
    process.exit(1)
}
const stream =  inputFileHandle.createReadStream()

stream.on("readable", () => {
    readChar(stream)
    stream.emit("end") 
})

stream.on("end", async () => {
    await inputFileHandle.close()
})

/**
 * @readonly
 * @enum {string}
 */
const TokenType = {
    UNKNOWN: "unknown",
    CHAR: "char",
}

/** 
 * @typedef {object} Token
 * @property {string} value
 * @property {TokenType} type
 */

/** @type {Token[]} */
const tokenTypes = [
    {value: '"', type: TokenType.CHAR},
]

/** @type {TokenType[]} */
const tokens = []

/**
 * 
 * @param {Readable} inputStream 
 */
function readChar(inputStream) {
    let counter = 0
    while (inputStream.readable) {
        if (counter++ > 10) {
            return
        }
        let charBuffer = inputStream.read(1)
        const char = String(charBuffer)
        
        console.log(char)
    }
}


