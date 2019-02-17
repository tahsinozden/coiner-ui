import React, {Component} from 'react';
import './App.css';
import ListGroup from "react-bootstrap/es/ListGroup";
import axios from 'axios';
import Header from "./components/Header";
import SockClient from "./services/SockClient";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionsTable from "./components/SubscriptionsTable";

class App extends Component {

    state = {
        subscriptions: [],
        notifications: [],
        currencyPairs: []
    };

    setStateProp = (name, value) => {
        const state = {...this.state};
        state[name] = value;
        this.setState(state);
    };

    handleNotification = (notification) => {
        console.log(notification);
        let message = "Currency Pair: " + notification.currencyPair
            + ", Limit: " + notification.threshold
            + ", CurrentValue: " + notification.currentValue
            + ", Timestamp: " + notification.timestamp;

        let state = {...this.state};
        state.notifications.push(message);
        this.setState(state);
    };

    loadSubscriptions = () => {
        axios.get('/subscriptions')
            .then(res => {
                this.setStateProp('subscriptions', res.data);
                console.log(res);
            });
    };

    loadCurrencyPairs = () => {
        axios.get('/currency-pairs')
            .then(res => {
                this.setStateProp('currencyPairs', res.data);
                console.log(res);
            });
    };

    subscribe = (pair, limit) => {
        axios.put(`/alert?pair=${pair}&limit=${limit}`)
            .then(res => {
                console.log(res);
                this.loadSubscriptions();
            });
    };

    unsubscribe = (subscription) => {
        axios.delete(`/alert?pair=${subscription.currencyPair}`)
            .then(res => {
                console.log(res);
                this.loadSubscriptions();
            });
    };

    componentDidMount() {
        this.loadSubscriptions();
        this.loadCurrencyPairs();
    }

    render() {

        let notifications = [];
        for (let item of this.state.notifications) {
            notifications.push(
                <ListGroup.Item key={this.state.notifications.indexOf(item)}>{item}</ListGroup.Item>
            );
        }

        return (
            <div className="App">

                <SockClient onMessage={this.handleNotification}/>
                <Header/>

                <div className="container-fluid" style={{marginTop: '80px'}}>
                    <h2>Welcome user</h2>
                    <SubscriptionForm currencyPairs={this.state.currencyPairs}
                                      onSubmit={this.subscribe}/>
                    <hr/>

                    <SubscriptionsTable subscriptions={this.state.subscriptions}
                                        onUnsubscribe={this.unsubscribe}/>
                    <hr/>

                    <h4>Subscription Alerts</h4>
                    <ListGroup>
                        {notifications}
                    </ListGroup>
                </div>


            </div>
        );
    }
}

export default App;
