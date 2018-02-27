import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Classes extends Component {
    componentDidMount(){
        console.log('Mounted')
        console.log('props', this.props)
    }
    render(){
        return (
            <div className='Classes'>
                Classes container
                <Header />
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Classes);