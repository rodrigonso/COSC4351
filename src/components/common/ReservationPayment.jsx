import React, { useContext } from 'react'
import { ReservationContext } from '../routes/ReservePage'
import { Button } from 'antd';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from 'firebase/functions';

export default function ReservationPayment() {
  const {state, setState, reservation, setReservation } = useContext(ReservationContext);

  console.log(reservation);

  const handleNextStep = async() => {
    const functions = getFunctions();
    connectFunctionsEmulator(functions, 'localhost', 5001);
    const functionHandle = httpsCallable(functions, 'makeReservation');

    const res = await functionHandle(reservation);
    console.log(res);
  }

  const handlePrevStep = () => {
    setState(state - 1);
  }

  console.log(reservation);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
      </div>
      <div>
        <Button onClick={handlePrevStep} style={{ marginRight: '1rem' }}>Back</Button>
        <Button onClick={handleNextStep} type="primary">Submit</Button>
      </div>
    </div>
  )
}
