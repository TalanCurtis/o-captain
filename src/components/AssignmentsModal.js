import React, { Component } from 'react';
import Modal from 'react-modal';

class AssignmentsModal extends Component {
    constructor(props) {
        Modal.setAppElement('body');
        super(props)
    this.state = {
        inputName: 'Placeholder',
        inputScoreMax: 0,
    }
}

handleOnChange(title, value) {
    this.setState({
        [title]: value
    })
}
    render() {
        return (
            <Modal
                isOpen={!!this.props.displayAssignmentsModal}
                onRequestClose={this.props.cancel}
                contentLabel='Assignment Modal'
                closeTimeoutMS={200}
                className='AssignmentsModal'
            >
            <h3>This is modal</h3>
            <div>
                <h4>Test Name</h4>
                <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            <div>
                <h4>Max Score</h4>
                <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))}/>
            </div>
            <button onClick={this.props.cancel} >Cancel</button>
            <button onClick={()=>this.props.addAssignment(this.state)}>Add</button>

            </Modal>
        )
    }

}

export default AssignmentsModal