import { Card, Typography, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuccessPage() {
    const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
        <Typography.Title level={3}>Reservation confirmed</Typography.Title>
        <Card style={{ minWidth: '25%', textAlign: 'center' }}>
            <p>Reservation details here</p>
            <Button style={{ width: '100%' }} type="primary" onClick={() => navigate("/")}>Back to home</Button>
        </Card>
    </div>
  )
}
