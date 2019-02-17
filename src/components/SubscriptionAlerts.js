import React from 'react'
import ListGroup from "react-bootstrap/es/ListGroup";

const SubscriptionAlerts = (props) => {
    let notifications = [];
    for (let item of props.notifications) {
        notifications.push(
            <ListGroup.Item key={item}>{item}</ListGroup.Item>
        );
    }

    return (
        <div>
            <h4>Subscription Alerts</h4>
            <ListGroup>
                {notifications}
            </ListGroup>
        </div>
    );
};

export default SubscriptionAlerts;