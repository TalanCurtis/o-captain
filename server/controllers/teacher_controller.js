module.exports = {
    getClasses: (req, res, next) => {
        console.log('getClasses endpoint hit')
        let id = req.params.id;
        // go get db info
        const db = req.app.get('db')
        let stack = []
        
        db.classes.find({
            user_id: req.params.id
        }).then(classes => {
            classes.forEach(klass => {
                console.log(klass.id, req.params.id*1)
                stack.push(db.new.get_class_test_summary( req.params.id, klass.id))
            })
            Promise.all(stack).then(summaries=>{
                console.log(summaries)
                let dbResponse = summaries.map(summary=>{
                    return {
                        tests_average:(summary[0].score / summary[0].max_score * 100).toFixed(1)*1,
                        class_name: summary[0].class_name,
                        class_id: summary[0].class_id
                    }
                })
                // Setup assignment stack to store db.assignment averages.
                // add promise .all  that waits for array to be completed then moves on.
                res.status(200).send(dbResponse)
            }).catch(console.log)
        }).catch(console.log)
    },
    addAssignment: (req, res, next) => {
        console.log('addAssignment: ', req.body)
        const { kind, max_score, description, due_date, class_id } = req.body
        const db = req.app.get('db')
        db.add_assignment([kind, max_score, description, due_date, class_id]).then(dbResponse => {
            // return that info
            db.get_all_assignments_for_class([dbResponse[0].class_id]).then(allAssignments => {
                res.status(200).send(allAssignments)
            })
        })
    }
}