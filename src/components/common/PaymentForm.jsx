import React, { useState } from 'react'
import { Form, Button, notification } from 'antd'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

export default function PaymentForm({handleSubmit, handleCancel}) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const stripe = useStripe();
    const elements = useElements();


    const handlePaymentSubmit = async() => {
        if (!stripe || !elements) return;
        setLoading(true);
        await handleSubmit();
        const res = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: process.env.REACT_APP_REDIRECT_URL
            }
        });
        setLoading(false);
        console.log(res);

        if (res.error) {
            notification.error({ message: "Payment failed", description: `Something went wrong while processing your payment: ${res.error.type}` });
        } else {
        }
    }

    const handleCancelDuringPayment = () => {
        if (loading) return;

        handleCancel();
    }

    return (
    <Form form={form} onFinish={handlePaymentSubmit}>
        <Form.Item>
            <PaymentElement />
        </Form.Item>
        <Form.Item>
            <Button style={{ width: '100%' }} loading={loading} htmlType="submit" type="primary">Confirm payment</Button>
            <Button onClick={handleCancelDuringPayment} style={{ width: '100%', marginTop: '0.5rem' }} danger>Go back</Button>
        </Form.Item>
    </Form>
    )
}
