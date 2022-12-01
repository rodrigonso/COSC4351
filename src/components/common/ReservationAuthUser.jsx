import React, {useContext, useState} from 'react'
import { Typography, Button, Statistic, Input, notification, InputNumber } from 'antd';
import { ReservationContext } from '../routes/ReservePage';
import { CurrentUserContext } from '../../App';

export default function ReservationAuthUser() {
    const [numberOfGuests, setNumberOfGuests] = useState(0);
    const { state, setState, reservation } = useContext(ReservationContext);
    const { currentUser } = useContext(CurrentUserContext);

    const handleNextStep = () => {
        if (numberOfGuests <= 0) {
            notification.open({ message: 'Number of guests', description: 'The number of guests you entered is not valid' });
            return;
        }

        Object.assign(reservation, {...currentUser, totalGuests: parseInt(numberOfGuests)});
        setState(state + 1);
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 2 }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                    <Typography.Title level={5}>Your information</Typography.Title>
                    <Typography.Text>{currentUser ? currentUser.name : 'N/A'}</Typography.Text>
                    <Typography.Text>{currentUser ? currentUser.email : 'N/A'}</Typography.Text>
                    <br/>
                    <Typography.Text type="secondary">Mailling address</Typography.Text>
                    <Typography.Text>{currentUser ? currentUser.mailingAddress : 'N/A'}</Typography.Text>
                    <br />
                    <Typography.Text>Number of guests: </Typography.Text>
                    <InputNumber defaultValue={numberOfGuests} onChange={(val) => setNumberOfGuests(val)} min={1} max={20} style={{ width: '15%'}} />
                </div>
                <div style={{ flexGrow: 1, marginTop: '2rem' }}>
                    <Button onClick={handleNextStep} type="primary">Next ➜</Button>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <Statistic title="Loyalty points" value={currentUser ? currentUser.loyaltyPoints : 0}/>
                    <br/>
                    <Typography.Text type="secondary">Loyalty number</Typography.Text>
                    <br/>
                    <Typography.Text code>{currentUser ? currentUser.loyaltyId : 'N/A'}</Typography.Text>
                </div>
                <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
            </div>
        </div>
    </div>
  )
}
