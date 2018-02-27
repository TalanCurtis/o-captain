module.exports = {
    getAll: (req, res, next) => {
        console.log('teacher endpoint hit')
        let id = req.params.id;
        // go get db info
        const db = req.app.get('db')
        db.get_all_teacher_info([id]).then(dbResponse => {
            // return that info
            res.status(200).send(dbResponse)
        })
    }
}