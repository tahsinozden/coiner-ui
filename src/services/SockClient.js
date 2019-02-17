import React from 'react'
import SockJsClient from 'react-stomp';

const SockClient = (props) => {
    return (
        <SockJsClient url='/ws' topics={['/user/queue/notify']}
                      onMessage={(msg) => {
                          props.onMessage(msg);
                      }}
                      ref={(client) => {
                          props.clientRef = client
                      }}/>
    );
};

export default SockClient;