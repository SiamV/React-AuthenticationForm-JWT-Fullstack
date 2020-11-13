const passport = require('passport');
// import passport from 'passport';

const handleJWT = (req, res, roles, next) => {
    return async (err, user, info) => {
        const error = err || info

        if (error || !user) return res.status(401).json({ status: 401, ...err })

        await req.logIn(user, { session: false })

        if (!roles.reduce((acc, rec) => acc && user.role.some(t => t === rec), true)) {
            return res.status(401).json({ status: 401, ...err })
        }

        req.user = user
        return next()
    }
}

const auth = (roles = []) => (req, res, next) => {
    return passport.authenticate('jwt', {
        session: true
    }, handleJWT(req, res, next, roles)
    )(req, res, next)
}

module.exports = auth;
// export default auth;