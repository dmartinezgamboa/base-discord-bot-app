const { work } = require('./worker')
const { workerDebug } = require('./debuggers')

const start = () => {
    work(workerDebug, "worker called froms start")
}

try { 
    start()
} catch(e) {
    console.log("PLEASE WORK???")
    workerDebug.error(e)
}