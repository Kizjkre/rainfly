import { parse } from "svelte/compiler";

/**
 * @type {AudioContext | undefined}
 */
let context;
let sampleRate = 48000;
let _blobUrl = "";

/**
 * Replace addModule url to be blobUrl
 * @param {string} code - code containing addModule function
 * @returns code with addModule replaced to blobUrl
 */
function replaceModuleUrl(code) {
    if (_blobUrl === "") {
        return code;
    }
    return code.replace(/addModule\(["'].*?["']\)/, `addModule('${_blobUrl}')`);
}

/**
 * Parse parameter from code string
 * @param {string} code code to parse
 * @param {string} paramName // @paramName = value
 * @returns parsed parameter value
 */
function parseParam(code, paramName) {
    const regex = new RegExp(`@${paramName}\\s*=\\s*(\\d+)`);
    const match = code.match(regex);
    return match ? parseInt(match[1], 10) : null;
}

/**
 * Run AudioWorkletProcessor code to build an AudioWorkletNode
 * @param {string} code - Processor code to run
 */
export function runProcessorCode(code) {
    console.log("run processor")
    _blobUrl = window.URL.createObjectURL(
        new Blob([code], {type: 'text/javascript'})
    );
}

/**
 * Run AudioContext code to execute Web Audio Code. If this code contains
 * AudioWorklet instantiation, `runProcessorCode` must be run first. 
 * @param {string} code - AudioContext Graph code to run
 */
export async function runMainCode(code) {
    console.log("run main")
    await context?.close();

    const tryParseSampleRate = parseParam(code, "sampleRate");
    if (tryParseSampleRate !== null) {
        sampleRate = tryParseSampleRate;
    }
    context = new AudioContext({sampleRate})

    let codeModule = replaceModuleUrl(code)
    eval(`(async () => {${codeModule}})()`)
}

export function resumeContext() {
    context?.resume();
}

export function suspendContext() {
    context?.suspend();
}