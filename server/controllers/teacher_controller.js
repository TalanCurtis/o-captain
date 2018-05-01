module.exports = {
    getClasses: (req, res, next) => {
        let id = req.params.id;
        // go get db info
        const db = req.app.get('db')
        let stack = []

        // quick way of pinging the db. db.<tableName>.find({<columnName>: argument})
        db.classes.find({
            user_id: req.params.id
        }).then(classes => {
            classes.forEach(klass => {
                stack.push(db.new.get_class_test_summary(req.params.id, klass.id))
            })
            Promise.all(stack).then(summaries => {
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
                //Filter and seperate assignments and tests then combine them to send back
                let newArr = []
                for (let i in dbResponse) {
                    for (j in dbResponse[i]) {
                        newArr.push(dbResponse[i][j])
                    }
                }
                let tests = []
                let assignments = []
                for (let i in newArr) {
                    if (newArr[i].kind === 'test') {
                        tests.push(newArr[i])
                    } else if (newArr[i].kind === 'assignment') {
                        assignments.push(newArr[i])
                    }
                }
                let combine = tests.map(test => {
                    for (let i in assignments) {
                        if (assignments[i].class_id === test.class_id) {
                            return {
                                average: ((test.average + assignments[i].average) / 2).toFixed(1) * 1,
                                class_name: test.class_name,
                                class_id: test.class_id,
                                tests: test.average,
                                assignments: assignments[i].average
                            }
                        }
                    }
                })
                res.status(200).send(combine)
            }).catch(console.log)
        }).catch(console.log)
    },
    getAssignments: (req, res, next) => {
        const db = req.app.get('db')
        db.new.get_assignments([req.params.class_id]).then(dbResponse => {
            let lists = {
                tests: [],
                assignments: []
            }
            dbResponse.forEach(x => {
                if (x.kind === 'test') {
                    lists.tests.push(x)
                } else if (x.kind === 'assignment') {
                    lists.assignments.push(x)
                }
            })
            res.status(200).send(lists)
        }).catch(console.log)
    },
    getClassInfo: (req, res, next) => {
        const db = req.app.get('db')
        db.new.get_class([req.params.class_id]).then(dbResponse => {
            res.status(200).send(dbResponse)
        }).catch(console.log)
    },
    getStudentAssignments: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.params)
        db.new.get_student_assignments([req.params.student_id, req.params.class_id]).then(dbResponse => {
            let lists = {
                tests: [],
                assignments: []
            }
            dbResponse.forEach(x => {
                x.average = ((x.score / x.max_score) * 100).toFixed(1) * 1
                if (x.kind === 'test') {
                    lists.tests.push(x)
                } else if (x.kind === 'assignment') {
                    lists.assignments.push(x)
                }
            })
            res.status(200).send(lists)
        }).catch(console.log)
    },
    getStudents: (req, res, next) => {
        const db = req.app.get('db')
        let stack = []
        db.new.get_students([req.params.class_id]).then(students => {
            students.forEach(student => {
                stack.push(db.new.get_student_averages(student.id, student.class_id))

            })
            Promise.all(stack).then(averages => {
                averages = [].concat.apply([], averages);
                let tests_avg = averages.filter(x => x.kind === 'test')
                let assignments_avg = averages.filter(x => x.kind === 'assignment')

                for (let i in students) {
                    for (let j in tests_avg) {
                        if (students[i].id === tests_avg[j].user_id) {
                            students[i].tests_avg = (((tests_avg[j].score * 1) / (tests_avg[j].max_score * 1)) * 100).toFixed(1) * 1
                        }
                    }
                }
                for (let i in students) {
                    for (let j in assignments_avg) {
                        if (students[i].id === assignments_avg[j].user_id) {
                            students[i].assignments_avg = (((assignments_avg[j].score * 1) / (assignments_avg[j].max_score * 1)) * 100).toFixed(1) * 1
                        }
                    }
                }
                res.status(200).send(students)
            })
        }).catch(console.log)
    },
    addAssignment: (req, res, next) => {
        const { kind, max_score, description, due_date, class_id } = req.body
        const db = req.app.get('db')
        db.add_assignment([kind, max_score, description, due_date, class_id]).then(dbResponse => {
            // add corosponding marks for all students
            // find all student enrolled in class
            // select * 
            // from users u
            // join enrollment e on e.user_id = u.id
            // where class_id = 3
            // for each student in list  add marks
            ////////////////////
            let stack = []
            db.enrollment.find({
                class_id: class_id
            }).then(students => {
                students.forEach(student => {
                    //score, date_received, notes, assignment_id, user_id
                    stack.push(db.new.add_mark(null, 0, '', dbResponse[0].id, student.user_id))
                })
                Promise.all(stack).then(response => {
                    res.status(200).send(dbResponse)
                })
            }).catch(console.log)
        }).catch(console.log)
    },
    updateAssignment: (req, res, next) => {
        const { kind, max_score, description, due_date, class_id, id } = req.body
        const db = req.app.get('db')
        db.new.update_assignment([max_score, description, id]).then(dbResponse => {
            res.status(200).send(dbResponse)
        })
    },
    editMark: (req, res, next) => {
        const { score, id } = req.body
        const db = req.app.get('db')
        db.new.edit_mark([score, id]).then(dbResponse => {
            res.status(200).send(dbResponse)
        })
    },
    deleteAssignment: (req, res, next) => {
        const { id } = req.body
        const db = req.app.get('db')
        db.new.delete_assignment([id]).then(dbResponse => {
            res.status(200).send(`${id} item deleted`)
        })
    }
}