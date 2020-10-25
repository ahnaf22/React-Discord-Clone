import { Avatar } from '@material-ui/core';
import React from 'react';
import './cssfiles/messagestyle.css';
import moment from 'moment';

function Message({ id, user, message, timestamp }) {

    return (
        <div className="message">
            <Avatar src={user.photo} />
            <div className="message_info">
                <h4>
                    {user.username}
                    <span className="message_timestamp">
                        {moment(new Date(timestamp?.toDate())).format('MMMM Do YYYY, h:mm a')}

                    </span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
