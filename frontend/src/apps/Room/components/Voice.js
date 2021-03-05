import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect as reduxConnect } from 'react-redux';

import Box from 'common/Box';
import { connect } from 'twilio-video';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Listener = styled.div`
    background-color: grey;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    ${props => props.isSpeaking && `border: 3px solid #68BA6C;`}
`;

const mapState = state => {
    return {
        identity: state.chat.userData.id
    };
};

const mapDispatch = {};

const Voice = reduxConnect(mapState, mapDispatch)(props => {
    const { identity } = props;

    const [speakers, setSpeakers] = useState([]);
    const [listeners, setListeners] = useState([]);
    const [dominantSpeaker, setDominantSpeaker] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            if (!identity) return null;

            const response = await axios.post('/getVoiceToken', {
                identity,
                name: ''
            });

            connectToRoom(response.data);
        };

        fetchToken();
    }, [identity]);

    const connectToRoom = token => {
        connect(
            token,
            { name: 'existing-room', audio: true, dominantSpeaker: true }
        ).then(
            room => {
                const existingListeners = [];
                existingListeners.push({ identity });

                room.on('participantConnected', participant => {
                    listeners.push({ identity: participant.identity });

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
                room.on('dominantSpeakerChanged', () => {
                    console.log(`DOMINANT SPEAKER CHANGED: ${room.dominantSpeaker.identity}`);

                    setDominantSpeaker(room.dominantSpeaker.identity);
                });
                room.on('participantDisconnected', event => {
                    console.log('PARTICIPANT DISCONNECTING');
                    console.log(event);
                });

                // DISPLAY EXISTING LISTENERS
                room.participants.forEach(participant => {
                    existingListeners.push({ identity: participant.identity });

                    participant.tracks.forEach(publication => {
                        if (publication.track) {
                            document.getElementById('remote-media-div').appendChild(publication.track.attach());
                        }
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });

                setListeners(existingListeners);
            },
            error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            }
        );
    };

    const renderListeners = () => {
        return listeners.map(listener => {
            return <Listener key={listener.identity} isSpeaking={dominantSpeaker === listener.identity} />;
        });
    };

    return (
        <Wrapper>
            <Box title={`${speakers.length} speaker${speakers.length === 1 ? '' : 's'} on stage`} height={60} styles />
            <Box title="Listeners" height={40} styles>
                {renderListeners()}
            </Box>
            <div id="remote-media-div" />
        </Wrapper>
    );
});

export default Voice;
