import jwt from "jsonwebtoken"

const secretKey = process.env.JWT_KEY || "do not share"

let loginId

const authorize = async (req, res, next) => {

    // try {
    // const userToken = req.headers["authorization"].replace("Bearer ", "")
    var userToken = req.headers.authorization.replace('Bearer ', '');
    // console.log("userToken", userToken)
    // console.log("env", process.env.JWT_KEY)
    const decodedToken = jwt.verify(userToken, secretKey)
    loginId = decodedToken.id
    next()
    // }
    // catch (error) {
    //     return res.status(404).send({ error })
    // }

}

export { authorize }