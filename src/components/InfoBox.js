import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class InfoBox extends Component {
    test() {
        console.log(this.props)
    }

    renderSwitch(key) {
        switch (key) {
            case 'Classes':
                let classes = this.props.classes.list
                let tests = []
                let assignments = []
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

            default:
                return console.log('Info box render switch defaulted');
        }
    }

    render() {
        return (
            <div className='InfoBox'>
                {this.renderSwitch(this.props.renderSwitch)}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(InfoBox);