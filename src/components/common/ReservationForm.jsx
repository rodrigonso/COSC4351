import React, { useContext, useState } from 'react'

import {Button, Form, Input, Typography} from 'antd';
import { ReservationContext } from '../routes/ReservePage';
import { useNavigate } from 'react-router-dom';

const {Title, Text} = Typography;

export default function ReservationForm() {
const navigate = useNavigate();
 const [form] = Form.useForm();
 const [userInfo, setUserInfo] = useState({});
 const { state, setState, reservation, setReservation } = useContext(ReservationContext);

 const handleNextStep = () => {
    const withUserInfo = Object.assign(reservation, userInfo);
    setReservation(withUserInfo);
    setState(state + 1);
 }

 const handleInput = (e, key) => {
    const { value } = e.target;
    const isNumber = (key === 'totalGuests');

    const withNewInput = Object.assign(userInfo, { [key]: isNumber ? parseInt(value) : value });
    setUserInfo(withNewInput);
 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '5rem' }}>
            <div style={{ flexGrow: 3 }}>
                <Form form={form} onFinish={handleNextStep}>
                    <Form.Item label="Name" name="name" rules={[{required: true, message: 'Please enter your name'}]}>
                        <Input onChange={(e) => handleInput(e, 'name')} style={{ width: 340 }}/>
                    </Form.Item>
                    <Form.Item name="Email" label="Email" rules={[{type: 'email', required: true, message: "Please enter a valid email"}]} >
                        <Input onChange={(e) => handleInput(e, 'email')} style={{ width: 342 }}/>
                    </Form.Item>
                    <Form.Item name="Phone number" label="Phone number"  >
                        <Form.Item style={{ display: 'inline-block', width: '9rem' }} rules={[{required: true}]}>
                            <Input onChange={(e) => handleInput(e, 'phoneNumber')} />
                        </Form.Item>
                        <Form.Item name="Guests" label='Guests' style={{ display: 'inline-block', width: '8rem', marginLeft: 10 }} rules={[{ required: true}]}>
                            <Input onChange={(e) => handleInput(e, 'totalGuests')} type="number" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Next ➜</Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
            <div style={{ flexGrow: 0, flexShrink: 0, flexBasis: '17.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center'}}>
                <Title level={4}>
                    Reserve faster!
                </Title>
                <Text>
                    Checkout faster when you create an account with Ringabell
                </Text>
                <Button onClick={() => navigate("/auth", { state: { operation: 'signup'} })} type="link" style={{ marginTop: '1rem' }}>Sign up</Button>
            </div>
        </div>
    </div>
  )
}