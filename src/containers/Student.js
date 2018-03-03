import React, { Component } from 'react';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';
import axios from 'axios';

class Student extends Component {
    constructor() {
        super();
        this.state = {
            tests: [],
            assignments: []
        }
    }
    componentDidMount() {
        // go hit database for student info for this class.
        const { classId, student_id } = this.props.match.params

        axios.get('/api/class/' + classId * 1 + '/student/' + student_id * 1).then((res) => {
            console.log('res: ', res.data)
            this.setState({
                tests: res.data.tests,
                assignments: res.data.assignments
            })
        })
    }
    test() {
        const { classID, student_id } = this.props.match.params

        console.log("props", this.props)
        console.log("state", this.state)

    }

    refreshLists() {
        const { classId, student_id } = this.props.match.params

        axios.get('/api/class/' + classId * 1 + '/student/' + student_id * 1).then((res) => {
            console.log('res: ', res.data)
            this.setState({
                tests: res.data.tests,
                assignments: res.data.assignments
            })
        })
    }

    render() {
        return (
            <div className='Student'>
                <Header title={'Student Name'} />
                <InfoBox renderSwitch='StudentTests'
                    infoList={this.state.tests}
                    refreshLists={this.refreshLists}
                />
                <button onClick={() => this.test()}>test</button>
            </div>
        )
    }
}

export default Student;