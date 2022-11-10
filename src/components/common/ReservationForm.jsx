import React from 'react'

import {Button, DatePicker, Form, Input, TimePicker, Typography} from 'antd';

const {Title, Text} = Typography;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};
 
export default function ReservationForm() {
  return (
    <div style={{ display: 'flex', gap: '5rem' }}>
        <div style={{ flexGrow: 3 }}>
            <Form>
                <Form.Item name="name&email" label="Name">
                    <Input style={{ width: 340 }}/>
                </Form.Item>
                <Form.Item name="Email" label="Email" rules={[{type: 'email'}]} >
                    <Input style={{ width: 342 }}/>
                </Form.Item>
                <Form.Item name="Phone number" label="Phone number">
                    <Form.Item style={{ display: 'inline-block', width: '9rem' }}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Guests" label='Guests' style={{ display: 'inline-block', width: '8rem', marginLeft: 10 }}>
                        <Input type="number" />
                    </Form.Item>
                </Form.Item>
                <Form.Item name="Date" label="Date">
                    <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 4px)'}}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(40% - 4px)', marginLeft: '0.5rem'}}>
                        <TimePicker />
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
        <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1, backgroundColor: 'rgb(240,240,240)' }} />
        <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '17.5rem'}}>
            <Title level={4}>
                Reserve faster!
            </Title>
            <Text>
                Checkout faster when you create an account with Ringabell
            </Text>
        </div>
    </div>
  )
}