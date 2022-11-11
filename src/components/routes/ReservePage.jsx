import React, { useEffect, useState, useContext } from 'react'
import "../common/styles/common.css"

import ReservationForm from '../common/ReservationForm';
import ReservationTablePicker from '../common/ReservationTablePicker';
import ReservationPayment from '../common/ReservationPayment';

import { Layout, Typography, Button, Steps, Card } from 'antd';
import BasicLayout from '../common/BasicLayout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ReservationLogin from '../common/ReservationLogin';
import ReservationAuthUser from '../common/ReservationAuthUser';

const { Header, Content } = Layout;
const { Title, Text} = Typography;

export const ReservationContext = React.createContext();

const States = Object.freeze({
  USER_INFO: 0,
  CHOOSE_TABLE: 1,
  SUBMIT_PAYMENT: 2,
});

const steps = [
  { title: 'User info'},
  { title: 'Choose table'},
  { title: 'Submit reservation'}
];

export default function ReservePage() {
  const [guest, setGuest] = useState(false);
  const [auth, setAuth] = useState(false);
  const [state, setState] = useState(States.USER_INFO)
  const [reservation, setReservation] = useState({ total: 10 });
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) setAuth(true);
      else setAuth(false);
    })
  });

  const renderCardBody = () => {
    if (!auth && !guest && state === States.USER_INFO) return <ReservationLogin handleGuest={() => setGuest(!guest)}/>
    if (auth && state === States.USER_INFO) return <ReservationAuthUser />
    if (guest && state === States.USER_INFO) return <ReservationForm guest={guest} />
    if (state === States.CHOOSE_TABLE) return <ReservationTablePicker />
    if (state === States.SUBMIT_PAYMENT) return <ReservationPayment /> 
  }

  const handleSubmitPayment = () => {
    if (state !== States.SUBMIT_PAYMENT) return;

    // TODO: process payment and redirect user
    console.log("TAKE PAYMENT");
  }

  return (
    <BasicLayout selectedMenuKey="/reserve">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Title>Reserve your table</Title>
      </div>
      <Card style={{ padding: 0 }} title={<Steps current={state} size="small" items={steps} style={{ minWidth: '45rem', maxWidth: '70rem'}} />}>
        <ReservationContext.Provider value={{ state, setState, reservation, setReservation }}>
          {renderCardBody()}
        </ReservationContext.Provider>
      </Card>
    </BasicLayout>
  )
}
