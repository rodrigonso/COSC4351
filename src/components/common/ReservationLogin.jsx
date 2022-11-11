import React, {useState} from 'react'

import { Button, Modal, Typography } from 'antd';
import SigninForm from './SigninForm';

export default function ReservationLogin({handleGuest}) {
const [showModal, setShowModal] = useState(false);

const handleSignIn = () => {
    setShowModal(true);
}

  return (
    <>
        <Modal open={showModal} title="Sign in" footer={null} onCancel={() => setShowModal(false)}>
            <SigninForm redirect={false} />
        </Modal>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Title level={5}>Please choose one to continue</Typography.Title>
            <Typography.Text>If you don't have an account already please click below to register, or continue as a guest</Typography.Text>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Button onClick={handleGuest}>Continue as guest</Button>
                <Button onClick={handleSignIn} type='primary'>Sign in</Button>
            </div>
        </div>
    </>
  )
}
