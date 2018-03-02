import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AssignmentsModal from '../components/AssignmentsModal';
import axios from 'axios';

class InfoBox extends Component {
    constructor() {
        super();
        this.state = {
            displayAssignmentsModal: false,
            assignmentToEdit:{}
        }
        this.addAssignment = this.addAssignment.bind(this)
        this.editAssignment = this.editAssignment.bind(this)
        this.updateAssignment = this.updateAssignment.bind(this)
    }
    test() {
        console.log(this.props,)

    }

    openAddAssignment() {
        console.log('openAddAssignment')
        this.setState({ 
            displayAssignmentsModal: true,
            assignmentToEdit:{}
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
        axios.post('/api/class/assignments/add', body).then(res=>{
            this.props.refreshLists()
        })
        this.setState({ displayAssignmentsModal: false })

    }
    cancelAddAssignment() {
        console.log('cancel add assignment')
        this.setState({ 
            displayAssignmentsModal: false,
            assignmentToEdit:{}
         })
    }
    deleteAssignment() {
        console.log('cancel add assignment')
        this.setState({ 
            displayAssignmentsModal: false,
            assignmentToEdit:{}
         })
    }
    editAssignment(assignment) {
        console.log('edit assignment', assignment)
        this.setState({ 
            displayAssignmentsModal: true,
            assignmentToEdit: assignment
        })
    }
    updateAssignment() {
        console.log('update assignment')
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
                        <Link to={'/Class/' + x.class_id} key={i} style={{ textDecoration: 'none' }}>
                            <div className='InfoBox_Content'>
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
                            <h3>{'Class'}</h3>
                            <h3>{'Tests'}</h3>
                            <h3>{'Assignments'}</h3>
                            <h3>{'Average'}</h3>
                        </div>
                        {info}
                    </div>
                )
            case "Tests":
                //console.log(this.props)
                info = this.props.infoList.map((x, i) => {
                    return (
                        <div key={i} className='InfoBox_Content' onClick={() => this.editAssignment(x)}>
                            <h3>{x.description}</h3>
                            <h3>{x.max_score}</h3>
                            <h3>{x.due_date}</h3>
                        </div>
                    )
                })
                return (
                    <div>
                        <div className="InfoBox_Header">
                            <h3>{'Test'}</h3>
                            <h3>{'Max Score'}</h3>
                            <h3>{'Due Date'}</h3>
                            <button onClick={() => this.openAddAssignment()}>Add</button>
                        </div>
                        {info}
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
                />
            </div>
        )
    }
}

export default InfoBox;