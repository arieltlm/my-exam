import React from 'react';
import PropTypes from 'prop-types';
import Job from '../job'
import './scss/index.scss'


const Stage = function ({
    title, 
    jobs,
}) { 
    return (
      <div className="stage">
        <div className="title">{title}</div>
        {jobs.map((jobItem, index) => (
            <Job
                key={jobItem.name}
                name={jobItem.name}
                status={jobItem.status}
                time={jobItem.time}
                index={index}
            />
        ))}
      </div>
    );
}

Stage.propTypes = {
    title: PropTypes.string.isRequired,
    jobs: PropTypes.array.isRequired,
}

// Stage.defaultProps = {
// 
// }

export default Stage
