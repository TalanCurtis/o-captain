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
    },
    addAssignment: (req, res, next) => {
        console.log('addAssignment: ', req.body)
        const {kind, max_score, description, due_date, class_id} = req.body
        const db = req.app.get('db')
        db.add_assignment([kind, max_score, description, due_date, class_id]).then(dbResponse => {
            // return that info
            db.get_all_assignments_for_class([dbResponse[0].class_id]).then(allAssignments=>{
                res.status(200).send(allAssignments)
            })
            // })
            // console.log('dbrespons: ', dbResponse)
            // res.status(200).send(dbResponse)
        })
    }
}