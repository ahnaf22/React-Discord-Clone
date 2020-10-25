import React from 'react'
import './cssfiles/sidebarChannelstyle.css';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from './features/appSlice';

function SidebarChannel({ id, channelName }) {

    const dispatch = useDispatch();
    const setChannel = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName: channelName
        }));
    }


    return (
        <div className="sidebarChannel" onClick={setChannel}>
            <h4>
                <span className="sidebarChannel_hash">#</span>
                {channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel;
