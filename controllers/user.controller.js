exports.allAccess = (req, res) =>{
    res.status(200).send("Public content")
}
exports.userBoard = (req, res) =>{
    res.status(200).send(`Welcome ${req.body.username} to user page.`)
}
exports.adminBoard = (req, res) =>{
    res.status(200).send(`Welcome ${req.body.username} to admin page.`)
}
exports.moderatorBoard = (req, res) =>{
    res.status(200).send(`Welcome ${req.body.username} to moderator page.`)
}

