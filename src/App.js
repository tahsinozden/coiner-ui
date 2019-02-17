import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Header from "./components/Header";
import SockClient from "./services/SockClient";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionsTable from "./components/SubscriptionsTable";
import SubscriptionAlerts from "./components/SubscriptionAlerts";
import InfoModal from "./components/InfoModal";

class App extends Component {

    state = {
        subscriptions: [],
        notifications: [],
        currencyPairs: [],
        infoMessage: {title: '', message: '', show: false},
        currentUserName: ''
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


    loadCurrentUserName = () => {
        axios.get('/users/current-user')
            .then(res => {
                this.setStateProp('currentUserName', res.data);
            });
    };

    subscribe = (pair, limit) => {
        axios.put(`/alert?pair=${pair}&limit=${limit}`)
            .then(res => {
                console.log(res);
                this.loadSubscriptions();
                this.showMessage("Success", "Subscription successful!");
            })
            .catch(error => {
                this.showMessage("Error", "Subscription failed!");
            });
    };

    unsubscribe = (subscription) => {
        axios.delete(`/alert?pair=${subscription.currencyPair}`)
            .then(res => {
                console.log(res);
                this.loadSubscriptions();
                this.showMessage("Success", "Unsubscription successful!");
            })
            .catch(error => {
                this.showMessage("Error", "Unsubscription failed!");
            });
    };

    showMessage = (title, message) => {
        const infoMessage = this.state.infoMessage;
        infoMessage.title = title;
        infoMessage.message = message;
        infoMessage.show = true;
        this.setStateProp('infoMessage', infoMessage);
    };

    componentDidMount() {
        this.loadCurrentUserName();
        this.loadSubscriptions();
        this.loadCurrencyPairs();
    }

    render() {
        return (
            <div className="App">
                <SockClient onMessage={this.handleNotification}/>
                <Header/>

                <div className="container-fluid" style={{marginTop: '80px'}}>
                    <h2>Welcome {this.state.currentUserName}</h2>
                    <SubscriptionForm currencyPairs={this.state.currencyPairs}
                                      onSubmit={this.subscribe}/>
                    <hr/>

                    <SubscriptionsTable subscriptions={this.state.subscriptions}
                                        onUnsubscribe={this.unsubscribe}/>
                    <hr/>

                    <SubscriptionAlerts notifications={this.state.notifications}/>

                    <InfoModal title={this.state.infoMessage.title}
                               message={this.state.infoMessage.message}
                               show={this.state.infoMessage.show}
                               onHide={() => this.setStateProp('infoMessage', {show: false})}/>
                </div>
            </div>
        );
    }
}

export default App;
