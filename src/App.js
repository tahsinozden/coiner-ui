import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Header from "./components/Header";
import SockClient from "./services/SockClient";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionsTable from "./components/SubscriptionsTable";
import SubscriptionAlerts from "./components/SubscriptionAlerts";

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
        this.setStateProp('notifications', state.notifications);
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

                    <SubscriptionAlerts notifications={this.state.notifications}/>
                </div>
            </div>
        );
    }
}

export default App;
