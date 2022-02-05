import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

import './stripe-button.stles.scss'

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_PmN7dN9HwijMPrUVsgRnVE9u006ShS1dUp";

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(res => {
            alert('Payment Successful')
        }).catch(err => {
            console.log('Payment error: ', JSON.parse(err));
            alert('There was an issue with your payment, kindly confirm your test credit card.')
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name="FIVE CLOTHING Ng"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;