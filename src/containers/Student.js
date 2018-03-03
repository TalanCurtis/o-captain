import React, { Component } from 'react';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';
// import axios from 'axios';

class Student extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        // go hit database for student info for this class.
    }
    test() {
        console.log("props", this.props)
        console.log("state", this.state)
    }
    render() {
        return (
            <div className='Student'>
                <Header title={'Student Name'} />
                student
            </div>
        )
    }
}

export default Student;