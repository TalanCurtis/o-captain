import React, { Component } from 'react';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';


class Classes extends Component {
    constructor() {
        super();
        this.state = {
            classList: []
        }
    }
    componentDidMount() { 
        // get user id then get class info for that user.       
        this.props.getUser().then(() => axios.get('/api/classes/' + this.props.user.id).then(res => {; this.setState({ classList: res.data }) }))
    }
    test() {
        console.log("props", this.props)
        console.log("state", this.state)
    }
    render() {
        return (
            <div className='Classes'>
                <Header title='Classes' />
                <InfoBox renderSwitch='Classes' 
                    infoList={this.state.classList}
                />
                {/* <button onClick={() => this.test()}>Props</button> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps, { getUser: getUser })(Classes);