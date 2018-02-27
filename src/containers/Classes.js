import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Classes extends Component {
    componentDidMount(){
    }
    test(){
        console.log("props", this.props)
        console.log("props first name: ", this.props.user.info.first_name)
    }
    render(){
        return (
            <div className='Classes'>
                Classes container
                <Header />
                <button onClick={()=>this.test()}>Props</button>
                <h1>{this.props.user.info.first_name}</h1>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}
export default connect(mapStateToProps)(Classes);