import React from 'react'
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

class SubscriptionForm extends React.Component {

    submit = () => {
        const pair = this.state.currencyPair;
        const limit = this.state.limit;
        if (pair === '' || limit === '') {
            return;
        }

        this.props.onSubmit(pair, limit);
    };

    handleOnChange = (event) => {
        const { target: {name, value} } = event;
        this.setState({ [name]: value });
    };

    constructor(props) {
        super(props);
        this.state = {
            currencyPair: '',
            limit: ''
        };
    }

    render() {
        let currencyPairs = [];
        for (let pair of this.props.currencyPairs) {
            currencyPairs.push(
                <option>{pair}</option>
            );
        }

        return (
            <div>
                <h4>Subscribe for a notification</h4>
                <Form>
                    <Form.Group controlId="subscriptionForm.CurrencyPairs">
                        <Form.Label>Currency Pairs</Form.Label>
                        <Form.Control as="select"
                                      name="currencyPair"
                                      value={this.state.currencyPair}
                                      onChange={this.handleOnChange}>
                            {currencyPairs}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="subscriptionForm.LimitInput">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control type="text"
                                      name="limit"
                                      value={this.state.limit}
                                      placeholder="notification limit"
                                      onChange={this.handleOnChange}/>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.submit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default SubscriptionForm;