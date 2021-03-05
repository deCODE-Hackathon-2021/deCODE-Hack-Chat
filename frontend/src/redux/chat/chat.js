import Twilio from 'twilio-chat'
import {chatJoinMember, chatReceiveMembers, chatReceiveMessage, chatSetUserIdentity} from "./actions";

export const chatHelpers = {};

export const initializeChat = async (store, user) => {
    const {
        identity,
        name
    } = user;

    const tokenResponse = await fetch('/getChatToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({identity, name})
    })
    store.dispatch(
        chatSetUserIdentity(identity)
    )

    const token = (await tokenResponse.json()).token;
    const chatClient = await Twilio.create(
        token,
    );

    const generalChannel = await chatClient.getChannelByUniqueName('general');
    const members = await generalChannel.getUserDescriptors();
    store.dispatch(
        chatReceiveMembers(members.items)
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
    } else {
        await generalChannel.leave();
        await generalChannel.join();
    }

    await new Promise((res) => setTimeout(() => res(), 500))

    await generalChannel.sendMessage('Hello')
}

