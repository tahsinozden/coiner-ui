import React from 'react'
import Table from "react-bootstrap/es/Table";
import Button from "react-bootstrap/es/Button";

const SubscriptionsTable = (props) => {
    let subscriptions = [];
    for (let subscription of props.subscriptions) {
        subscriptions.push(
            <tr key={subscription.id}>
                <td>{subscription.id}</td>
                <td>{subscription.currencyPair}</td>
                <td>{subscription.threshold}</td>
                <td><Button variant="secondary" onClick={() => props.onUnsubscribe(subscription)}>Unsubsribe</Button>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <h4>Your Subscriptions</h4>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Currency Pair</th>
                    <th>Limit</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {subscriptions}
                </tbody>
            </Table>
        </div>
    )
};

export default SubscriptionsTable;