


const errorMiddleware = (err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Backend Error"
    const extraInfo = err.extradetails || "Backend Error"

    res.status(500).json({
        sucess: false,
        status, message, extraInfo,
    })
}


module.exports = errorMiddleware