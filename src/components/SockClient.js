import React from 'react'
import SockJsClient from 'react-stomp';

const SockClient = (props) => {
    return (
        <SockJsClient url='/ws' topics={['/user/queue/notify']}
                      onMessage={(msg) => props.onMessage(msg)}/>
    );
};

export default SockClient;