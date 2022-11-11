import React, {useState} from 'react'
import { Button, Card, Checkbox, Form, Input } from 'antd';

import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import { FirebaseApp } from '../..';
import { useNavigate  } from 'react-router-dom';



export default function SigninForm({redirect = true}) {
    const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const onFinish = (values) => {
    const {email, password} = values;

    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(res => {
        setLoading(true);
        if (redirect)
            navigate('/');
    });
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

  return (
    <Card>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please enter your password' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item style={{ marginTop: '2rem' }} wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
            Log in
        </Button>
        </Form.Item>
    </Form>
  </Card>
  )
}
