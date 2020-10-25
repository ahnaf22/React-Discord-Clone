import React, { useEffect, useState } from 'react';
import './cssfiles/chatstyle.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannnelName } from './features/appSlice';
import db from './Firebase';
import firebase from 'firebase';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannnelName);

    const [input, setInput] = useState("");
    const [messages, setMessage] = useState([]);


    useEffect(() => {

        if (channelId) {
            db.collection('channels')
                .doc(channelId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snap => {
                    setMessage(snap.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })));
                });

        }
        window.setTimeout(function () {
            var elem = document.getElementById('chat_messages');
            elem.scrollTop = elem.scrollHeight;
        }, 1000);

    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels')
            .doc(channelId)
            .collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user,

            });
        setInput("");
        var elem = document.getElementById('chat_messages');
        elem.scrollTop = elem.scrollHeight;
    }

    // console.log(messages.length);

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            {/* the chat message poart */}
            <div className="chat_messages" id="chat_messages">
                {

                    messages.length < 1 ?
                        <div className="chat_nomessage">
                            <p>No messages here</p>
                            <span>send new message to start a conversation</span>
                        </div>
                        :
                        messages.map(message => (
                            <Message
                                key={message.id}
                                id={message.id}
                                timestamp={message.data.timestamp}
                                user={message.data.user}
                                message={message.data.message}
                            />))
                }

            </div>

            {/* chatinput area */}
            <div className="chat_input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} disabled={!channelId} type="text" placeholder="Message #testchannel" />
                    <button
                        onClick={sendMessage}
                        className="chat_inputButton" type="submit">
                        Send message
                    </button>
                </form>

                <div className="chat_inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
