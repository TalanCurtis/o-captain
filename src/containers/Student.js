import React, { Component } from 'react';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';
import axios from 'axios';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            student: '',
            tests: [],
            assignments: []
        }
        this.refreshLists = this.refreshLists.bind(this)
        this.sort= this.sort.bind(this)
        
    }
    componentDidMount() {
        // go hit database for student info for this class.
        const { classId, student_id } = this.props.match.params

        axios.get('/api/class/' + classId * 1 + '/student/' + student_id * 1).then((res) => {
            this.setState({
                tests: res.data.tests,
                assignments: res.data.assignments,
                student: res.data.tests[0].first_name + ' ' + res.data.tests[0].last_name
            })
        })
    }

    refreshLists() {
        const { classId, student_id } = this.props.match.params

        axios.get('/api/class/' + classId * 1 + '/student/' + student_id * 1).then((res) => {
            this.setState({
                tests: res.data.tests,
                assignments: res.data.assignments
            })
        })
    }

    sort(sortedList, stateName){
        this.setState({[stateName]: sortedList})
    }

    render() {
        return (
            <div className='Student'>
                <Header title={this.state.student} />
                <InfoBox renderSwitch='StudentTests'
                    infoList={this.state.tests}
                    refreshLists={this.refreshLists}
                    sort={this.sort}
                />
                <InfoBox renderSwitch='StudentAssignments'
                    infoList={this.state.assignments}
                    refreshLists={this.refreshLists}
                    sort={this.sort}
                />
            </div>
        )
    }
}

export default Student;