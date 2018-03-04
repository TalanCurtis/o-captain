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

    test() {
        console.log('props: ', this.props)
        console.log('state: ', this.state)
    }
    renderSwitch(key) {
        let modalDisplay = []
        switch (key) {
            case 'addAssignment':
                modalDisplay = (
                    <div>
                        <h2> Add New {this.props.itemToEdit.kind.toUpperCase()}</h2>
                        <div>
                            <h2>Name</h2>
                            <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div>
                            <h2>Max Score</h2>
                            <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div className='ConfimationButtons_Container'>
                            <button onClick={this.props.cancel}>Cancel</button>
                            <button onClick={() => this.props.addAssignment(Object.assign({}, this.props.itemToEdit,
                                {
                                    max_score: this.state.inputScoreMax * 1,
                                    description: this.state.inputName,
                                    due_date: '11/22/2016',
                                    class_id: this.props.class_id
                                }
                            ))}>Add</button>
                        </div>

                    </div>
                )

                return (
                    <div>
                        {modalDisplay}
                    </div>
                )
            case 'editAssignment':
                modalDisplay = (
                    <div>
                        <h2> Edit: {this.props.itemToEdit.description}</h2>
                        <div>
                            <h2>Name : {this.props.itemToEdit.description}</h2>
                            <input title='inputName' type="text" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div>
                            <h2>Max Score: {this.props.itemToEdit.max_score}</h2>
                            <input title='inputScoreMax' type="number" onChange={(e) => (this.handleOnChange(e.target.title, e.target.value))} />
                        </div>
                        <div className='ConfimationButtons_Container'>
                            <button onClick={() => this.props.deleteAssignment(this.props.itemToEdit)} >Delete</button>
                            <button onClick={this.props.cancel}>Cancel</button>
                            <button onClick={() => this.props.editAssignment(Object.assign({}, this.props.itemToEdit,
                                {
                                    max_score: this.state.inputScoreMax * 1,
                                    description: this.state.inputName
                                }
                            ))}>Update</button>
                        </div>

                    </div>
                )

                return (
                    <div>
                        {modalDisplay}
                    </div>
                )
            case 'editMark':

                return (
                    <div>
                        add mark
                    </div>
                )

            default:
                return console.log('assignment modal render switch defaulted');
        }
    }

    render() {
        console.log('modal props', this.props)
        return (
            <Modal
                isOpen={!!this.props.displayAssignmentsModal}
                onRequestClose={this.props.cancel}
                contentLabel='Assignment Modal'
                closeTimeoutMS={200}
                className='AssignmentsModal'
            >
                {this.renderSwitch(this.props.modalRenderSwitch)}
                <button onClick={() => this.test()}>Props</button>

            </Modal>
        )
    }
}

export default AssignmentsModal