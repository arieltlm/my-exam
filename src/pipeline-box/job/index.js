import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import './scss/index.scss'

const Job = function ({ 
    name,
    status,
    time,
    index
}) { 
    return (
        <div className={`job job${index}`}>
            <div className="status">
                {
                    status === 'success' 
                        ?  <CheckCircleOutlined  className="icon-success"/> 
                        : (
                            <CloseCircleOutlined className="icon-fail" />
                        )
                }
            </div>
            <div className="name">{name}</div>
            <div className="time">{moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
    )
}

Job.propTypes = {
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

// Job.defaultProps = {
// 
// }

export default Job
