import React, {useEffect, useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import Room from "./apps/Room";
import './App.css';
import {store} from "./index";
import {initializeChat} from "./redux/chat/chat";
import initializeQuestions from "./redux/questions/questions";


function App() {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});

    const responseFacebook = async (response) => {
        setData(response);

        if (response.accessToken) {
            const user = {
                identity: `${response.id}`,
                name: `${response.name}`,
                data: response
            };

            await initializeChat(store, user);
            await initializeQuestions(store, user);

            setLogin(true);
        } else {
            setLogin(false);
        }
    }

    return (
        <div>
            <div>
                {!login &&
                <div style={{ marginTop: '20%', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <FacebookLogin
                    appId="785768468241627"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"/>
                 </div>
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
