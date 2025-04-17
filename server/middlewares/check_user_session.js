module.exports = (req, res, next) => {

    if (req.session.isAuthenticated) {  

        next()
        
    } else {

        res.json({message: "no session", isAuthenticated: req.session.isAuthenticated})

    }

}