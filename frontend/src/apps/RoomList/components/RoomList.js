import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { connect } from 'twilio-video';

const RoomList = () => {
    const [token, setToken] = useState(null);

    useEffect(async () => {
        const response = await axios.post('/getVoiceToken', {
            identity: `${Math.floor(Math.random() * 1000)}`,
            name: ''
        });

        setToken(response.data);
    }, []);

    if (!token) return null;

    const connectToRoom = () => {
        connect(
            token,
            { name: 'existing-room', audio: true, dominantSpeaker: true }
        ).then(
            room => {
                console.log(`Successfully joined a Room: ${room}`);
                room.on('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" connected`);

                    participant.tracks.forEach(publication => {
                        if (publication.isSubscribed) {
                            const track = publication.track;
                            document.getElementById('remote-media-div').appendChild(track.attach());
                        }
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });

                room.participants.forEach(participant => {
                    participant.tracks.forEach(publication => {
                        if (publication.track) {
                            document.getElementById('remote-media-div').appendChild(publication.track.attach());
                        }
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });
            },
            error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            }
        );
    };

    const joinRoom = () => {};

    return (
        <>
            <button onClick={connectToRoom}>connect</button>
            <button onClick={joinRoom}>join</button>
            <div id="remote-media-div" />
        </>
    );
};

export default RoomList;
