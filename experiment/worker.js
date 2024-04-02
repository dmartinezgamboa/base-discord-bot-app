const work = (debug, message) => {
    debug.log(message)

    setTimeout(work, 1000, debug, 'inside work setTimeout (1)')

    const secondDebug = debug.extend('second')
    setTimeout(work, 3000, secondDebug, 'inside work setTimeout (2)')

    setTimeout(() => {throw new Error('eureka!')}, 7000)
}

module.exports = { work }