import React, { useEffect, useState } from 'react';
import './cssfiles/sidebarstyle.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar, Tooltip } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import { auth } from './Firebase';
import db from './Firebase';


function Sidebar() {

    //lets get user info from redux store
    const user = useSelector(selectUser);
    const [channelList, setChannelList] = useState([]);
    // console.log(user);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => {
            setChannelList(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })));
        });
    }, []);

    const addChannel = () => {
        const channelName = prompt("Enter a channel Name");
        if (channelName) {
            db.collection("channels").add({
                channelName
            }).catch(error => alert(error.message));
        }
    }

    return (
        <div className="sidebar">
            {/* top of sidebar */}
            <div className="sidebar_top">
                <h2>Discord Clone</h2>
                <ExpandMoreIcon />
            </div>

            {/* channels goes here */}
            <div className="sidebar_channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={addChannel} className="sidebar_addChannel" />
                </div>

                {/* channels list */}
                <div className="sidebar_channelsList">
                    {
                        channelList.map(({ id, channel }) => (
                            <SidebarChannel
                                key={id}
                                id={id}
                                channelName={channel.channelName}
                            />
                        ))
                    }

                </div>
            </div>

            {/* voice sidebar */}
            <div className="sidebar_voice">
                <SignalCellularAltIcon
                    className="sidebar_voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>stream</p>
                </div>
                <div className="sidebar_voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            {/* profile section */}
            <div className="sidebar_profile">
                <Avatar src={user.photo} />
                <div className="sidebar_profileInfo">
                    <h3>{user.username}</h3>
                    <p>#{user.userId.substring(0, 8)}</p>
                </div>
                <div className="sidebar_profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <Tooltip title="Log out">
                        <ExitToAppIcon onClick={() => auth.signOut()} />
                    </Tooltip>

                </div>
            </div>

        </div>
    )
}

export default Sidebar
