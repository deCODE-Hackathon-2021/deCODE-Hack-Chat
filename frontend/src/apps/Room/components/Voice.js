import React, { useEffect, useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect as reduxConnect } from 'react-redux';
import { SocketContext } from '../../../socketio';

import Box from 'common/Box';
import { connect } from 'twilio-video';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ParticipantWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Speaker = styled.img`
    background-color: ${props => props.isSpeaking ? '#68BA6C' : 'white'};
    width: 64px;
    height: 64px;
    border-radius: 50%;
    padding: 3px;
`;

const Listener = styled.img`
    background-color: grey;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    ${props => props.isSpeaking && `border: 3px solid #68BA6C;`}
`;

const SelfImage = styled.img`
    border-radius: 32px;
    height: 28px;
    width: 28px;
    margin-right: 8px;
`;

const speakerControls = {
    position: 'absolute',
    right: 16,
    top: 16
}

const leaveButtonStyle = {
    postion: 'absolute',
    background: 'none',
    border: 'none',
    fontStyle: 'normal',
    color: '#DD3F4F'
};

const muteButtonStyle = {
    postion: 'absolute',
    background: 'none',
    border: 'none',
    fontStyle: 'normal',
    color: '0,0,0,0.6',
}

const speakButtonStyle = {
    background: 'none',
    border: 'none',
    fontStyle: 'normal',
    color: '#0584FE',
    position: 'absolute',
    right: 16,
    bottom: 16
};

const mapState = state => {
    return {
        identity: state.chat.userData.id,
        members: state.chat.members
    };
};

const mapDispatch = {};

const Voice = reduxConnect(mapState, mapDispatch)(props => {
    const { identity, members } = props;

    const [speakers, setSpeakers] = useState(["2920248831584709", "4014296055261020"]);
    const [listeners, setListeners] = useState([]);

    const socket = useContext(SocketContext);

    const handleJoinSpeakers = useCallback(() => {
        socket.emit('addSpeaker', identity);
    }, []);

    const handleLeaveSpeakers = useCallback(() => {
        socket.emit('removeSpeaker', identity);
    }, []);

    const [dominantSpeaker, setDominantSpeaker] = useState(null);
    const [voiceStatus, setVoiceStatus] = useState('Mute');
    const [speaking, setSpeaking] = useState(false);
    const [room, setRoom] = useState(null);

    useEffect(() => {

        if (room) {
            console.log(identity);

            const handleSpeakers = ["2920248831584709", "4014296055261020"];
            setSpeakers(handleSpeakers);
            let existingListeners = [];
            room.participants.forEach(participant => {
                if (!handleSpeakers.includes(participant.identity)) {
                    existingListeners.push({identity: participant.identity});
                }
            });

            if (!handleSpeakers.includes(identity)) {
                existingListeners.push({identity});
            }

            setListeners(existingListeners);
        }
    }, [room])

    // useEffect(() => {
    //     if (room) {
    //         socket.on('listSpeakers', () => {
    //             const handleSpeakers = ['10224861379505576', '4388307441186485'];
    //             setSpeakers(handleSpeakers);
    //             let existingListeners = [];
    //             room.participants.forEach(participant => {
    //                 console.log(participant.identity);
    //                 if (!handleSpeakers.includes(participant.identity)) {
    //                     existingListeners.push({ identity: participant.identity });
    //                 }
    //             });
    //
    //             if (!handleSpeakers.includes(identity)) {
    //                 existingListeners.push({ identity });
    //             }
    //
    //             setListeners(existingListeners);
    //         });
    //     }
    // }, [socket, room]);

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
                    if (!room.dominantSpeaker) {
                        setDominantSpeaker(null);
                        return null;
                    }

                    setDominantSpeaker(room.dominantSpeaker.identity);
                });
                room.on('participantDisconnected', participant => {
                    if (!participant) return null;
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

                room.localParticipant.audioTracks.forEach(audioTrack => {
                    audioTrack.track.disable();
                });


                console.log(existingListeners);
                setListeners(existingListeners);
                setRoom(room);
                console.log('ROOM: ' + room);
            },
            error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            }
        );
    };

    const renderListeners = () => {
        return (
            <ParticipantWrapper>
                {listeners.map(listener => {
                    return (
                        <Listener
                            key={listener.identity}
                            isSpeaking={false}
                            src={members[listener.identity].attributes.picture}
                        />
                    );
                })}
            </ParticipantWrapper>
        );
    };

    const renderSpeakers = () => {
        return (
            <ParticipantWrapper>
                {speakers.map(speaker => {
                    return (
                        <Speaker
                            key={speaker}
                            isSpeaking={dominantSpeaker === speaker}
                            src={members[speaker].attributes.picture}
                        />
                    );
                })}
            </ParticipantWrapper>
        );
    };

    const toggleVoice = () => {
        if (voiceStatus === 'Mute') {
            room.localParticipant.audioTracks.forEach(audioTrack => {
                audioTrack.track.enable();
            });
            setVoiceStatus('Unmute');
        } else {
            room.localParticipant.audioTracks.forEach(audioTrack => {
                audioTrack.track.disable();
            });
            setVoiceStatus('Mute');
        }
    };

    const toggleSpeaker = () => {
        if (speaking) {
            room.localParticipant.audioTracks.forEach(audioTrack => {
                audioTrack.track.disable();
            });
            setVoiceStatus('Mute');
            handleLeaveSpeakers();

            const newSpeakers = speakers.filter(speaker => speaker !== identity);
            setSpeakers(newSpeakers);

            listeners.push({identity});
            setListeners(listeners);
        } else {
            room.localParticipant.audioTracks.forEach(audioTrack => {
                audioTrack.track.enable();
            });
            setVoiceStatus('Unmute');
            handleJoinSpeakers();

            const newListeners = listeners.filter(listener => listener.identity !== identity);

            setListeners(newListeners);

            speakers.push(identity);
            setSpeakers(speakers);
        }
        setSpeaking(!speaking);
    };

    return (
        <Wrapper>
            <Box title={`${speakers.length} speaker${speakers.length === 1 ? '' : 's'} on stage`} height={60} styles>
                <div style={speakerControls}>
                                    {speaking && (
                    <button style={leaveButtonStyle} onClick={toggleSpeaker}>
                        Leave
                    </button>
                )}
                {speaking && (
                    <button style={muteButtonStyle} onClick={toggleVoice}>
                        {voiceStatus == 'Mute' ? 'Unmute' : 'Mute'}
                    </button>
                )}
                </div>
                {renderSpeakers()}
            </Box>
            <Box title="Listeners" height={40} styles>
                {renderListeners()}
                {!speaking && (
                    <button style={speakButtonStyle} onClick={toggleSpeaker}>
                        Speak ✋
                    </button>
                )}
            </Box>
            <div id="remote-media-div" />
        </Wrapper>
    );
});

export default Voice;
