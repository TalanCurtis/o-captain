import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';

class Class extends Component {
    componentDidMount() {
    }

    test() {
        console.log(this.props)
    }
    render() {
        // get class id from url
        let class_id = this.props.match.url.split('/').pop() * 1
        return (
            <div className='Class'>
                <Header title={'Class Name Here'} />
                <InfoBox renderSwitch='Tests' class_id={class_id} />
                <button onClick={() => this.test()}>Props</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(Class);