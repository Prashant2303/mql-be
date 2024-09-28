import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export function authCheck(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedUser = jwt.verify(token, process.env.SECRET);
        console.log('Auth successful');
        res.locals.userData = {
            user: { _id: new ObjectId(decodedUser.id) },
            userString: decodedUser.id,
            token
        };
        next();
    } catch (err) {
        console.log('Auth fail');
        return res.status(401).send('Unauthorized user');
    }
}