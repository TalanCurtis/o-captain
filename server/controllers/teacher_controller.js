module.exports = {
    getClasses: (req, res, next) => {
        console.log('getClasses endpoint hit')
        let id = req.params.id;
        // go get db info
        const db = req.app.get('db')
        let stack = []

        // quick way of pinging the db. db.<tableName>.find({<columnName>: argument})
        db.classes.find({
            user_id: req.params.id
        }).then(classes => {
            classes.forEach(klass => {
                console.log(klass.id, req.params.id * 1)
                stack.push(db.new.get_class_test_summary(req.params.id, klass.id))
            })
            Promise.all(stack).then(summaries => {
                console.log('Summeries: ',summaries)
                let dbResponse = summaries.map(summary => {
                    return [
                        {
                            average: (summary[0].score / summary[0].max_score * 100).toFixed(1) * 1,
                            class_name: summary[0].class_name,
                            class_id: summary[0].class_id,
                            kind: summary[0].kind
                        },
                        {
                            average: (summary[1].score / summary[1].max_score * 100).toFixed(1) * 1,
                            class_name: summary[1].class_name,
                            class_id: summary[1].class_id,
                            kind: summary[1].kind
                        }
                    ]
                })
                // Setup assignment stack to store db.assignment averages.
                // add promise .all  that waits for array to be completed then moves on.
                let newArr = []
                for (let i in dbResponse){
                    for (j in dbResponse[i]){
                        newArr.push(dbResponse[i][j])
                    }
                }
                let tests = []
                let assignments = []
                for (let i in newArr){
                    if (newArr[i].kind === 'test'){
                        tests.push(newArr[i])
                    }else if (newArr[i].kind === 'assignment'){
                        assignments.push(newArr[i])
                    }
                }
                let combine = tests.map(test=>{
                    for(let i in assignments){
                        if (assignments[i].class_id === test.class_id){
                            return{
                                average: ((test.average + assignments[i].average)/2).toFixed(1)*1,
                                class_name: test.class_name,
                                class_id: test.class_id,
                                tests:test.average,
                                assignments: assignments[i].average
                            }
                        }
                    }
                })
                console.log('dbResponse: ',combine)
                // console.log('tests: ',tests)
                // console.log('assignments: ',assignments)
                res.status(200).send(combine)
            }).catch(console.log)
        }).catch(console.log)
    },
    getAssignments: (req, res, next) =>{
        console.log('getAssignments', req.params.class_id)
        // res.status(200).send('made it')
        const db = req.app.get('db')
        db.new.get_assignments([req.params.class_id]).then( dbResponse => {
            let lists={
                tests:[],
                assignments:[]
            }
            dbResponse.forEach(x => {
                if(x.kind==='test'){
                    lists.tests.push(x)
                }else if(x.kind === 'assignment'){
                    lists.assignments.push(x)
                }
            })
            res.status(200).send(lists)
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