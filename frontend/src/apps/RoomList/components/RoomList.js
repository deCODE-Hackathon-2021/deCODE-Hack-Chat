import React from 'react';

import { connect } from 'twilio-video';

const RoomList = () => {
    const connectToRoom = () => {
        connect(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzVlMDk1Yjc5MjQ5ZDg0YWYwMmMwODI2YjNkM2EzNGU2LTE2MTQ4OTg4NjYiLCJpc3MiOiJTSzVlMDk1Yjc5MjQ5ZDg0YWYwMmMwODI2YjNkM2EzNGU2Iiwic3ViIjoiQUM4N2FiZWI1MGI1YzAzM2JhNmVhYTkxOWIxNmIyYTMwNyIsImV4cCI6MTYxNDkwMjQ2NiwiZ3JhbnRzIjp7ImlkZW50aXR5IjoidGVzdCIsInZpZGVvIjp7fX19.bk33NK3Ay4_R9VoJOgP2je6bAPSLtil0H_UyYVLMtQo',
            { name: 'existing-room' }
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
            },
            error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            }
        );
    };

    const joinRoom = () => {

    }

    return (
        <>
            <button onClick={connectToRoom}>connect</button>
            <button onClick={joinRoom}>join</button>
            <div id="remote-media-div" />
        </>
    );
};

export default RoomList;
