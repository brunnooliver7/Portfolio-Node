module.exports = async function exceptionHandler (error, req, res, next) {
    return res.status(500).json({ error: 'Internal server error' })
}