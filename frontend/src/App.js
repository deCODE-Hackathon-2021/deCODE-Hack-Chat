import React, {useEffect, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import Room from "./apps/Room";
import './App.css';
import {store} from "./index";
import {initializeChat} from "./redux/chat/chat";


function App() {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});

    const responseFacebook = async (response) => {
        setData(response);

        if (response.accessToken) {
            await initializeChat(store, {
                identity: `${response.id}`,
                name: `${response.name}`,
                data: response
            });

            setLogin(true);
        } else {
            setLogin(false);
        }
    }

    return (
        <div>
            <div>
                {!login &&
                <FacebookLogin
                    appId="785768468241627"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"/>
                }
            </div>
            <div>
                {login &&
                <Room/>
                }
            </div>
        </div>
    );
}

export default App;
