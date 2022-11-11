import React, {useContext} from 'react'
import { Typography, Button, Card, Statistic } from 'antd';
import { ReservationContext } from '../routes/ReservePage';
import { CurrentUserContext } from '../../App';

export default function ReservationAuthUser() {
    const { state, setState, reservation, setReservation } = useContext(ReservationContext);
    const { currentUser } = useContext(CurrentUserContext);

    const handleNextStep = () => {
        setState(state + 1);
    }

    console.log(currentUser);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <Typography.Title level={5}>Your information</Typography.Title>
                    <Typography.Text>{currentUser ? currentUser.name : 'N/A'}</Typography.Text>
                    <Typography.Text>{currentUser ? currentUser.email : 'N/A'}</Typography.Text>
                    <br />
                    <Statistic title="Points" value={currentUser ? currentUser.loyaltyPoints : 0}/>
                    <Typography.Text type="secondary">Loyalty number</Typography.Text>
                    <Typography.Text code>{currentUser ? currentUser.loyaltyId : 'N/A'}</Typography.Text>
                </div>
                <div style={{ flexGrow: 1, marginTop: '2rem' }}>
                    <Button onClick={handleNextStep} type="primary">Next ➜</Button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Typography.Title level={5}>Preffered payment</Typography.Title>
                <div>
                    <Typography.Text>Visa ending 3434</Typography.Text>
                    <br/>
                    <br/>
                    <Typography.Text type="secondary">Expiration date</Typography.Text>
                    <br/>
                    <Typography.Text>11-05-2023</Typography.Text>
                </div>
            </div>
        </div>
    </div>
  )
}
