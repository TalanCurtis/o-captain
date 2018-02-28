import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class InfoBox extends Component {
    test() {
        console.log(this.props)
    }

    addAssignment(){
        console.log('add assignment')
    }
    editAssignment(){
        console.log('edit assignment')
    }

    renderSwitch(key) {
        let tests = []
        let assignments = []
        let classes = this.props.classes.list
        switch (key) {
            case 'Classes':
                tests = []
                assignments = []
                classes = classes.map((x, i) => {
                    for (let i in x.students) {
                        for (let j in x.students[i].marks) {
                            if (x.students[i].marks[j].kind === 'test') {
                                tests.push(x.students[i].marks[j].score / x.students[i].marks[j].score_max)
                            } else if (x.students[i].marks[j].kind === 'assignment') {
                                assignments.push(x.students[i].marks[j].score / x.students[i].marks[j].score_max)
                            }
                        }
                    }
                    let testsAverage = (tests.reduce((acc, x) => (acc + x)) / tests.length * 100).toFixed(1) * 1
                    let assignmentsAverage = (assignments.reduce((acc, x) => (acc + x)) / assignments.length * 100).toFixed(1) * 1
                    let average = ((testsAverage + assignmentsAverage) / 2).toFixed(1) * 1
                    return (
                        <Link to={'/Class/' + x.class_id} key={i} style={{ textDecoration: 'none' }}>
                            <div className='InfoBox_Content' >
                                <h3>{x.class_name}</h3>
                                <h3>{testsAverage}</h3>
                                <h3>{assignmentsAverage}</h3>
                                <h3>{average}</h3>
                            </div>
                        </Link>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h3>{'Class'}</h3>
                            <h3>{'Tests'}</h3>
                            <h3>{'Assignments'}</h3>
                            <h3>{'Average'}</h3>
                        </div>
                        {classes}
                    </div>
                )

            case 'Tests':
                tests = []
                for (let i in classes) {
                    if (classes[i].class_id === this.props.class_id) {
                        console.log('class found')
                        for (let j in classes[i].assignments) {
                            if (classes[i].assignments[j].kind === 'test') {
                                console.log('found test')
                                tests.push(classes[i].assignments[j])
                            }
                        }
                    }
                }
                let classTests = tests.map((x, i) => {

                    return (
                            <div className='InfoBox_Content'  onClick={()=>this.editAssignment()} key={i}>
                                <h3>{x.desc}</h3>
                                <h3>{x.max}</h3>
                                <h3>{x.dateDue}</h3>
                            </div>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h3>{'Test'}</h3>
                            <h3>{'Max Score'}</h3>
                            <h3>{'Date Due'}</h3>
                            <button onClick={()=>this.addAssignment()}>Add</button>
                        </div>
                        {classTests}
                    </div>
                )

            default:
                return console.log('Info box render switch defaulted');
        }
    }

    render() {
        return (
            <div className='InfoBox'>
                {this.renderSwitch(this.props.renderSwitch)}
                <button onClick={() => this.test()}>test</button>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(InfoBox);