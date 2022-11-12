import React, { useContext, useEffect, useState } from 'react'
import { ReservationContext } from '../routes/ReservePage'
import { notification, Statistic, Tag, Typography } from 'antd';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import moment from 'moment';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY_TEST);

export default function ReservationPayment() {
  const functions = getFunctions();

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(undefined);
  const {state, setState, reservation } = useContext(ReservationContext);

  useEffect(() => {
    setLoading(true);
    const functionHandle = httpsCallable(functions, 'createPaymentIntent');
    functionHandle(reservation).then(res => {
      console.log(res);
      setClientSecret(res.data.clientSecret);
    }).catch(err => {
      notification.error({ message: 'Payment failed', description: 'We are unable to process payments right now, please try again later' });
    })
    setLoading(false);
  }, [functions, reservation]);

  console.log(reservation);

  const handleNextStep = async() => {

    // TODO: remove line below after testing
    // connectFunctionsEmulator(functions, 'localhost', 5001);

    const functionHandle = httpsCallable(functions, 'makeReservation');
    await functionHandle(reservation);
  }

  const handlePrevStep = () => {
    setState(state - 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography.Title level={4}>Summary</Typography.Title> 
      <div style={{ flexGrow: 0, flexBasis: 'auto', height: 1.5, backgroundColor: 'rgb(240,240,240)' }}></div>
      <div style={{ display: 'flex', gap: '2rem'}}>
      <div style={{ flex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Statistic title="Total" prefix="$" value={reservation.total} />
            <Typography.Text type='secondary'>* Reservation fee</Typography.Text>
          </div>
          <div style={{ flexGrow: 0, flexBasis: 'auto', height: 1.5, backgroundColor: 'rgb(240,240,240)' }}></div>
          {!loading && clientSecret && (<Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <PaymentForm handleCancel={handlePrevStep} handleSubmit={handleNextStep} />
          </Elements>)}
        </div>
        <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Typography.Text type="secondary">Who</Typography.Text>
            <br/>
            <Typography.Text>{reservation.name}</Typography.Text>
          </div>
          <div>
            <Typography.Text type="secondary">When</Typography.Text>
            <br/>
            <Typography.Text>{moment(reservation.startDate).format('MMMM Do YYYY, h:mm a')} - {moment(reservation.endDate).format('h:mm a')}</Typography.Text>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <Typography.Text type="secondary">Guests</Typography.Text>
              <br />
              <Typography.Text>{reservation.totalGuests}</Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary">Tables</Typography.Text>
              <br/>
              {reservation.tables.map(table => <Tag>{table.name}</Tag>)}
            </div>
          </div>
          <div style={{ flexGrow: 0, flexBasis: 'auto', height: 1.5, backgroundColor: 'rgb(240,240,240)' }}></div>
        </div>
      </div>
    </div>
  )
}
