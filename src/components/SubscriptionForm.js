import React from 'react'
import Form from "react-bootstrap/es/Form";
import Button from "react-bootstrap/es/Button";

class SubscriptionForm extends React.Component {

    submit = () => {
        const pair = this.selectedPair.current.value;
        const limit = this.limit.current.value;
        if (pair === '' || limit === '') {
            return;
        }

        this.props.onSubmit(pair, limit);
    };

    constructor(props) {
        super(props);
        this.selectedPair = React.createRef();
        this.limit = React.createRef();
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
                                      ref={this.selectedPair}>
                            {currencyPairs}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="subscriptionForm.LimitInput">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control type="text"
                                      placeholder="notification limit"
                                      ref={this.limit}/>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.submit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default SubscriptionForm;