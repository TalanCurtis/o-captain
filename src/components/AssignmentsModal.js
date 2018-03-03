import React, { Component } from 'react';
import Modal from 'react-modal';

class AssignmentsModal extends Component {
    constructor(props) {
        Modal.setAppElement('body');
        super(props)
    this.state = {
        inputName: 'Placeholder',
        inputScoreMax: 0,
        inputNewScore: 0
    }
}

handleOnChange(title, value) {
    this.setState({
        [title]: value
    })
}
    render() {
        console.log( 'modal props', this.props)
        // Check to see if assignment object is empty
        let assignment = this.props.assignmentToEdit
        let isEmpty = Object.keys(this.props.assignmentToEdit).length === 1 && this.props.assignmentToEdit.constructor === Object
        console.log(assignment)
        return (
            <Modal
                isOpen={!!this.props.displayAssignmentsModal}
                onRequestClose={this.props.cancel}
                contentLabel='Assignment Modal'
                closeTimeoutMS={200}
                className='AssignmentsModal'
            >
            {isEmpty?<h3>{'Add Item'}</h3>: <h3>{'Edit: '+assignment.kind}</h3>}
            <div>
                {isEmpty?<h4>Add Name</h4>: <h4>{'Name: '+assignment.description}</h4>}
                <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            <div>
                {isEmpty?<h4>Max Score</h4>: <h4>{'Max Score: '+assignment.max_score}</h4>}
                <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            {isEmpty? null :  <button onClick={()=>this.props.deleteAssignment(assignment)} >Delete</button>}
            <button onClick={this.props.cancel} >Cancel</button>
            {isEmpty?<button onClick={()=>this.props.addAssignment(Object.assign({},this.state, this.props.assignmentToEdit))}>Add</button> : <button onClick={()=>this.props.updateAssignment(this.state, assignment)}>Update</button>}
            </Modal>
        )
    }

}

export default AssignmentsModal