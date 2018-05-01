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
        this.sort= this.sort.bind(this)
    }
    componentDidMount() { 
        // get user id then get class info for that user.       
        this.props.getUser().then(() => axios.get('/api/classes/' + this.props.user.id).then(res => {; this.setState({ classList: res.data }) }))
    }


    sort(sortedList, stateName){
        this.setState({[stateName]: sortedList})
    }

    render() {
        return (
            <div className='Classes'>
                <Header title='Classes' />
                <h1>Hello {`${this.props.user.first_name} ${this.props.user.last_name}`} !</h1>
                <InfoBox renderSwitch='Classes' 
                    infoList={this.state.classList}
                    sort={this.sort}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps, { getUser: getUser })(Classes);