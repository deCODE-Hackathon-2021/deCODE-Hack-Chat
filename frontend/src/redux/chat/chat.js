import Twilio from 'twilio-chat'
import {chatJoinMember, chatReceiveMembers, chatReceiveMessage, chatSetUserIdentity, chatSetUserData} from "./actions";

export const chatHelpers = {};

export const initializeChat = async (store, user) => {
    const {
        identity,
        name,
        data
    } = user;

    const tokenResponse = await fetch('/getChatToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identity,
            name,
            picture: data.picture?.data?.url
        })
    })
    store.dispatch(
      chatSetUserIdentity(identity)
    );
    store.dispatch(
      chatSetUserData(data)
    );

    const token = (await tokenResponse.json()).token;
    const chatClient = await Twilio.create(
        token,
    );
    chatHelpers.chatClient = chatClient;

    const generalChannel = await chatClient.getChannelByUniqueName('general');
    const members = await generalChannel.getUserDescriptors();
    const self = await chatClient.getUserDescriptor(identity);

    store.dispatch(
        chatReceiveMembers([
            ...members.items,
            self
        ])
    )

    generalChannel.on('messageAdded', (e) => store.dispatch(
        chatReceiveMessage(e.state)
    ))
    generalChannel.on('memberJoined', async (e) => {
        const user = await chatClient.getUserDescriptor(e.state.identity)

        store.dispatch(chatJoinMember(user))
    });
    chatHelpers.sendMessage = (message) => generalChannel.sendMessage(message);
    
    if(generalChannel.status !== 'joined') {
        await generalChannel.join();
    }
}

