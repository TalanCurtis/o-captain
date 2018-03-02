import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AssignmentsModal from '../components/AssignmentsModal';
import axios from 'axios';

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

    openAddAssignment() {
        console.log('openAddAssignment')
        this.setState({
            displayAssignmentsModal: true,
            assignmentToEdit: {}
        })
    }
    addAssignment(value) {
        let body = {
            kind: 'test',
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
            data: {id: assignment.id}
        }
        console.log('deleteAssignment body', body)
        axios.delete('/api/class/assignments/delete', body).then(res=>{
            console.log(' delete res: ',res.data)
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
        axios.put('/api/class/assignments/update', body).then(res=>{
            console.log(' update res: ',res.data)
            this.props.refreshLists()
        })
        this.setState({
            displayAssignmentsModal: false,
            assignmentToEdit: {}
        })
    }

    renderSwitch(key) {
        let info = []
        switch (key) {
            case 'Classes':
                info = this.props.infoList.map((x, i) => {
                    return (
                        <Link className='Link' key={i} to={'/Class/' + x.class_id} style={{ textDecoration: 'none' }} >
                            <div className='InfoBox_Text'>
                                <h3>{x.class_name}</h3>
                                <h3>{x.tests}</h3>
                                <h3>{x.assignments}</h3>
                                <h3>{x.average}</h3>
                            </div>
                        </Link>


                    )
                })
                return (
                    <div>
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
                            <button onClick={() => this.openAddAssignment()}>Add</button>
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