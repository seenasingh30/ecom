const sendBadRequest = (res, msg = "Bad Request!") => {
    return res.status(400).send(
        {
            code: 400,
            msg: msg
        }
    )
}

const sendSystemError = (res,err,msg = "System Error!") => {
    return res.status(500).send(
        {
            code: 500,
            error: err,
            msg: msg
        }
    )
}

const sendSuccess = (res, data, msg,meta={})=>{
    return res.status(200).send({
        code:200,
        data:data,
        msg:msg,
        meta: meta
    })
}

module.exports = {
    sendBadRequest,
    sendSuccess,
    sendSystemError
};