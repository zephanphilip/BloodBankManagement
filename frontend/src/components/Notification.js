import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Notification = ({ notification }) => {
   
    return (
        <div className="notification">
            <p>{notification.message}</p>
            <small>{formatDistanceToNow(new Date(notification.date), { addSuffix: true })}</small>
        </div>
    );
};

export default Notification;
