import React, {Component} from 'react';
import Header from '../components/Header';
import InfoBox from '../components/InfoBox';

class Classes extends Component {
    componentDidMount(){
    }
    test(){
        console.log("props", this.props)
    }
    render(){
        return (
            <div className='Classes'>
                <Header title='Classes'/>
                <InfoBox renderSwitch='Classes'/>
                <button onClick={()=>this.test()}>Props</button>
            </div>
        )
    }
}

export default Classes;