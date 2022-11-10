import React, { useState } from 'react'
import "../common/styles/common.css"

import ReservationForm from '../common/ReservationForm';
import ReservationTablePicker from '../common/ReservationTablePicker';
import ReservationPayment from '../common/ReservationPayment';

import { Layout, Typography, Button, Steps, Card } from 'antd';
import BasicLayout from '../common/BasicLayout';

const { Header, Content } = Layout;
const { Title, Text} = Typography;

const States = Object.freeze({
  USER_INFO: 0,
  CHOOSE_TABLE: 1,
  SUBMIT_PAYMENT: 2
});

const steps = [
  { title: 'User info'},
  { title: 'Choose table'},
  { title: 'Submit reservation'}
];

export default function ReservePage() {
  const [state, setState] = useState(States.USER_INFO)

  const renderCardBody = () => {
    if (state === States.USER_INFO) return <ReservationForm />
    if (state === States.CHOOSE_TABLE) return <ReservationTablePicker />
    if (state === States.SUBMIT_PAYMENT) return <ReservationPayment /> 
  }

  const renderCardAction = () => {
    if (state === States.USER_INFO) return <Button onClick={handleNextStep} type="primary">Next ➜</Button>
    else if (state === States.SUBMIT_PAYMENT) return (
      <>
        <Button onClick={handlePrevStep} type="secondary">Back</Button>
        <Button style={{ marginLeft: '0.5rem' }} onClick={handleSubmitPayment} type="primary">Submit</Button>
      </>
    )
    else return (
      <>
        <Button onClick={handlePrevStep} type="secondary">Back</Button>
        <Button style={{ marginLeft: '0.5rem' }}onClick={handleNextStep} type="primary">Next ➜</Button>
      </>
    )
  }

  const handleNextStep = () => {
    if (state === States.SUBMIT_PAYMENT) return;
    setState(state + 1);
  }

  const handlePrevStep = () => {
    if (state === States.USER_INFO) return;
    setState(state - 1);
  }

  const handleSubmitPayment = () => {
    if (state !== States.SUBMIT_PAYMENT) return;

    // TODO: process payment and redirect user
    console.log("TAKE PAYMENT");
  }

  return (
    <BasicLayout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title>Reserve your table</Title>
      </div>
      <Card title={<Steps current={state} size="small" items={steps} style={{ minWidth: '45rem' }} />}>
        {renderCardBody()}
        {renderCardAction()}
      </Card>
    </BasicLayout>
  )
}
