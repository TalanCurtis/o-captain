import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AssignmentsModal from '../components/AssignmentsModal';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            displayAssignmentsModal: false,
            assignmentToEdit: {}
        }
        this.addAssignment = this.addAssignment.bind(this)
        this.editAssignment = this.editAssignment.bind(this)
        this.updateAssignment = this.updateAssignment.bind(this)
        this.deleteAssignment = this.deleteAssignment.bind(this)
    }
    test() {
        console.log(this.props, )

    }

    openAddAssignment(kind) {
        console.log('openAddAssignment')
        this.setState({
            displayAssignmentsModal: true,
            assignmentToEdit: { kind: kind }
        })
    }
    addAssignment(value) {
        console.log('Value coming from modal: ', value)
        let body = {
            kind: value.kind,
            max_score: value.inputScoreMax * 1,
            description: value.inputName,
            due_date: '11/22/2016',
            class_id: this.props.class_id
        }
        axios.post('/api/class/assignments/add', body).then(res => {
            this.props.refreshLists()
        })
        this.setState({ displayAssignmentsModal: false })

    }
    cancelAddAssignment() {
        console.log('cancel add assignment')
        this.setState({
            displayAssignmentsModal: false,
            assignmentToEdit: {}
        })
    }
    deleteAssignment(assignment) {
        console.log('deleteAssignment assignment', assignment)
        // When using delete with a body it needs to be in a data: key
        let body = {
            data: { id: assignment.id }
        }
        console.log('deleteAssignment body', body)
        axios.delete('/api/class/assignments/delete', body).then(res => {
            console.log(' delete res: ', res.data)
            this.props.refreshLists()
        })
        this.setState({
            displayAssignmentsModal: false,
            assignmentToEdit: {}
        })
    }
    editAssignment(assignment) {
        console.log('edit assignment', assignment)
        this.setState({
            displayAssignmentsModal: true,
            assignmentToEdit: assignment
        })
    }
    updateAssignment(value, original) {
        console.log('update assignment')
        let body = {
            id: original.id,
            kind: original.kind,
            max_score: value.inputScoreMax * 1,
            description: value.inputName,
            due_date: original.due_date,
            class_id: original.class_id
        }
        console.log('update body', body)
        axios.put('/api/class/assignments/update', body).then(res => {
            console.log(' update res: ', res.data)
            this.props.refreshLists()
        })
        this.setState({
            displayAssignmentsModal: false,
            assignmentToEdit: {}
        })
    }

    renderSwitch(key) {
        let info = []
        // Chart variables
        //// labels is they name of the classes in chart
        let labels = []
        //// numbers is the value of the average for class grade
        let numbers = []
        // colors array lets me choose different color for value in numbers
        let colors = []
        let data = {}
        let options = {}

        switch (key) {
            case 'Classes':
                info = this.props.infoList.map((x, i) => {
                    labels.push(x.class_name)
                    numbers.push(x.average)
                    colors.push(x.tests > 65 ? ('#00C800') : ('#FF0000'))
                    return (
                        <Link className='Link' key={i} to={'/Class/' + x.class_id} style={{ textDecoration: 'none' }} >
                            <div className='InfoBox_Text'>
                                <h3>{x.class_name}</h3>
                                {(x.tests > 65) ? <h3>{x.tests}</h3> : <h3 style={{ "color": "red" }}>{x.tests}</h3>}
                                {(x.assignments > 65) ? <h3>{x.assignments}</h3> : <h3 style={{ "color": "red" }}>{x.assignments}</h3>}
                                {(x.average > 65) ? <h3>{x.average}</h3> : <h3 style={{ "color": "red" }}>{x.average}</h3>}
                            </div>
                        </Link>
                    )
                })
                // Chart Data
                data = {
                    labels: labels,
                    datasets: [{
                        label: 'Grade Average',
                        data: numbers,
                        backgroundColor: colors
                    }]
                }
                console.log('thisis data', data)
                // Chart Options
                options = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }]
                    },
                    // maintainAspectRatio: false
                }
                return (
                    <div>
                        <div>
                            <Bar options={options} data={data} />
                        </div>
                        <div className="InfoBox_Header">
                            <h2>{'Class'}</h2>
                            <h2>{'Tests'}</h2>
                            <h2>{'Assignments'}</h2>
                            <h2>{'Average'}</h2>
                        </div>
                        <div className='InfoBox_Content'>
                            {info}
                        </div>
                    </div>
                )
            case "Tests":
                //console.log(this.props)
                info = this.props.infoList.map((x, i) => {
                    return (
                        <div key={i} className='InfoBox_Text' onClick={() => this.editAssignment(x)}>
                            <h3>{x.description}</h3>
                            <h3>{x.max_score}</h3>
                            <h3>{x.due_date}</h3>
                        </div>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h2>{'Test'}</h2>
                            <h2>{'Max Score'}</h2>
                            <h2>{'Due Date'}</h2>
                            <button onClick={() => this.openAddAssignment('test')}>Add</button>
                        </div>
                        <div className='InfoBox_Content'>
                            {info}
                        </div>

                    </div>
                )
            case "Assignments":
                info = this.props.infoList.map((x, i) => {
                    return (
                        <div key={i} className='InfoBox_Text' onClick={() => this.editAssignment(x)}>
                            <h3>{x.description}</h3>
                            <h3>{x.max_score}</h3>
                            <h3>{x.due_date}</h3>
                        </div>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h2>{'Assignment'}</h2>
                            <h2>{'Max Score'}</h2>
                            <h2>{'Due Date'}</h2>
                            <button onClick={() => this.openAddAssignment('assignment')}>Add</button>
                        </div>
                        <div className='InfoBox_Content'>
                            {info}
                        </div>

                    </div>
                )
            case 'Students':
                info = this.props.infoList.map((x, i) => {
                    return (
                        <Link className='Link' key={i} to={'/Class/'+x.class_id+'/Student/'+ x.id} style={{ textDecoration: 'none' }}>
                            <div className='InfoBox_Text'>
                                <h3>{x.first_name}</h3>
                                <h3>{x.last_name}</h3>
                                <h3>{x.tests_avg}</h3>
                                <h3>{x.assignments_avg}</h3>
                            </div>
                        </Link>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h2>{'First'}</h2>
                            <h2>{'Last'}</h2>
                            <h2>{'Tests'}</h2>
                            <h2>{'Assignments'}</h2>
                        </div>
                        <div className='InfoBox_Content'>
                            {info}
                        </div>
                    </div>
                )
            default:
                return console.log('render switch defaulted');
        }
    }

    render() {
        return (
            <div className='InfoBox'>
                {this.renderSwitch(this.props.renderSwitch)}
                <AssignmentsModal
                    addAssignment={this.addAssignment}
                    cancel={() => this.cancelAddAssignment()}
                    displayAssignmentsModal={this.state.displayAssignmentsModal}
                    assignmentToEdit={this.state.assignmentToEdit}
                    editAssignment={this.editAssignment}
                    updateAssignment={this.updateAssignment}
                    deleteAssignment={this.deleteAssignment}
                />
            </div>
        )
    }
}

export default InfoBox;