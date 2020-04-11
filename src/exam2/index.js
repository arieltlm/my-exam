import React from 'react';
import {ajaxReq} from './ajax-req'


class XxxxXxx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        ajaxReq("/api/allDataSourceType", "GET", { a: 1 }).then((res) => {
            console.log(1, res);
        });
        setTimeout(() => {
            this.reqclick();
        }, 5000);
    }

    reqclick = () => {
        ajaxReq("/api/allDataSourceType", "GET", { a: 1 }).then((res) => {
            console.log(2, res);
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.reqclick}>点击</button>
            </div>
        );
    }
}

// XxxxXxx.propTypes = {
//
// }

// XxxxXxx.defaultProps = {
//
// }

export default XxxxXxx;
