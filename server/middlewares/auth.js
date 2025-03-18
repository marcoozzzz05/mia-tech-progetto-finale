const { User } = require("../db");
const { verifyToken } = require("../utilities/auth");

/**
 * Authorize user with role
 * @param {string} role - Role of the user
 * @returns {Function} Middleware function
 */
const authUser = (role = "USER") => async (req, res, next) => {
    role = role.toLocaleUpperCase();
    const bearer = req.headers.authorization || req.headers["authorization"] || req.headers["Authorization"] || req.query.token || false;

    if (!bearer) return res.status(401).json({ message: "Unauthorized" });

    const token = !req.query?.token ? bearer.split(" ")[1] : bearer;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = verifyToken(token);

        if (decoded.role.toLocaleUpperCase() !== role) return res.status(403).json({ message: "Forbidden" });

        const user = await User.findOne({ _id: decoded._id, role }, "-password", { lean: true });

        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user;
        req.user_token = token;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { 
    authUser,
};