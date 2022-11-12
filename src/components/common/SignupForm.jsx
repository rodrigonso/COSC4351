import React, {useState} from 'react'
import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Select,
  } from 'antd';

import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const { Option } = Select

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


export default function SignupForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [billingSameAsMailing, setBillingSameAsMailling] = useState(false);
    const [form] = Form.useForm();
    // const navigate = useNavigate();

    const onFinish = (values) => {
        const { name, email, password, mailingAddress, billingAddress, phone, preferredPayment } = values;
    
        const auth = getAuth();
        const functions = getFunctions();
    
        // TODO: remove this after debugging
        // connectFunctionsEmulator(functions, 'localhost', 5001);
        
        setLoading(true);
        const callHandle = httpsCallable(functions, 'createUser');
        createUserWithEmailAndPassword(auth, email, password).then(res => {
            const user = Object.assign({name, email, mailingAddress, phone, preferredPayment}, {id: res.user.uid})
            if (values.billingSameAsMailing) user.billingAddress = billingAddress;
            callHandle(user);
            setLoading(false);
            navigate('/auth', { state: { operation: 'signin' } })
        }).catch(err => console.error(err));
    }

  return (
    <Card>
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        >
        <Form.Item
            name="name"
            label="Name"
            rules={[
            {
                required: true,
                message: 'Please input your name!',
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="email"
            label="E-mail"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="confirm"
            label="Confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>     
        <Form.Item
            name="mailingAddress"
            label="Address"
            rules={[
            { required: true, message: 'Please enter your mailing address' },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="billingsameasmailing"
            valuePropName="checked"
            {...tailFormItemLayout}
            >
            <Checkbox onClick={() => setBillingSameAsMailling(!billingSameAsMailing)}>
            Billing address is same as mailing address
            </Checkbox>
        </Form.Item>
        <Form.Item
            hidden={billingSameAsMailing}
            name="billingAddress"
            label="Billing"
            rules={[{ required: !billingSameAsMailing, message: 'Please enter your billing address' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
            <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
            name="preferredPayment"
            label="payment"
            rules={[{ required: true, message: 'Please select a payment method' }]}
        >
            <Select placeholder="Select your payment">
            <Option value="card">Card</Option>
            <Option value="cash">Cash</Option>
            <Option value="check">Check</Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
            {
                validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
            ]}
            {...tailFormItemLayout}
        >
            <Checkbox>
            I have read the agreement
            </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
            Register
            </Button>
        </Form.Item>
        </Form>
    </Card>
  )
}


