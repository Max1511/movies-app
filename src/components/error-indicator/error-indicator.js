import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {

    const message = 'Something is wrong!';

    return (
        <span className='message'>{message}</span>
    );
};

export default ErrorIndicator;