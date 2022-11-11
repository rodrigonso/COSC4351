import React, { useContext } from 'react'
import { ReservationContext } from '../routes/ReservePage'
import { Button } from 'antd';

export default function ReservationPayment() {
  const {state, setState, reservation, setReservation } = useContext(ReservationContext);

  console.log(reservation);

  const handleNextStep = () => {

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
