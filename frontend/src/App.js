import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import Room from "./apps/Room";
import './App.css';
import {store} from "./index";
import {initializeChat} from "./redux/chat/chat";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    initializeChat(store, {
      identity: `facebook_uid ${response.id}`,
      name: `${response.name}`,
      data: response
    });
  }

  return (
    <div>
    <div>
          { !login &&
            <FacebookLogin
              appId="785768468241627"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
    </div>
    <div>
        { login &&
          <Room/>
        }
    </div>
    </div>
  );
}

export default App;
