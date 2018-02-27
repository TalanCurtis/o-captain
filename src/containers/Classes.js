import React, {Component} from 'react';
import { connect } from 'react-redux';

class Classes extends Component {
    componentDidMount(){
        console.log('Mounted')
        console.log('props', this.props)
    }
    render(){
        return (
            <div className='Classes'>
                Classes container
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Classes);