const { work } = require('./worker')

const start = () => {
    work("worker called from start")
}

start()