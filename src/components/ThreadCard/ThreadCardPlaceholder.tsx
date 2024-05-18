import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';

import './ThreadCard.css';

interface ThreadCardPlaceholderProps {}

const ThreadCardPlaceholder: React.FC<ThreadCardPlaceholderProps> = () => {
  return (
    <div className='card-container'>
      <div className='card'>
        <div className='card-body my-0'>
          <Placeholder
            as='p'
            animation='glow'
            className='threadcard-author my-0'
          >
            <Placeholder xs={3} />
          </Placeholder>
          <Placeholder as='h5' animation='glow' className='card-title'>
            <Placeholder xs={1} /> <Placeholder xs={3} /> <Placeholder xs={2} />
          </Placeholder>
        </div>
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
          }}
        >
         <Placeholder
            as='div'
            animation='glow'
            className='vote-view-placeholder'
          /> 
        </div> */}
      </div>
    </div>
  );
};

export default ThreadCardPlaceholder;
