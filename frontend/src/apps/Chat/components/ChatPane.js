import React, {useState} from 'react';


const ChatPane = () => {

    const [tab, setTab] = useState('qa');

    const tabIndicatorStyle = (selected) => ({
        fontWeight: selected ? 'bold' : undefined,
        color: selected ? 'black' : '#AAA',
        marginLeft: '8px',
        marginRight: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingBottom: '4px',
        cursor: 'pointer',
        borderBottom: selected ? '3px solid #0584FE' : undefined,
        fontSize: '0.9em'
    })


    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '4px',
        }}>
            <div style={{
                display: 'flex',
                padding: '4px 16px 0px 16px',
                borderBottom: '1px solid #ddd',
            }}>
                <div style={tabIndicatorStyle(tab === 'qa')} onClick={() => setTab('qa')}>
                    Q&A
                </div>
                <div style={tabIndicatorStyle(tab === 'chat')} onClick={() => setTab('chat')}>
                    General Chat
                </div>
            </div>
        </div>
    )
}

export default ChatPane;
