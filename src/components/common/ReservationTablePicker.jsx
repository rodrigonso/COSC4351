import React, { useContext, useState } from 'react'
import { Card, Statistic, Button, Calendar, TimePicker, notification, Empty, Spin } from 'antd';
import { ReservationContext } from '../routes/ReservePage';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function ReservationTablePicker() {
  const { state, setState, reservation, setReservation } = useContext(ReservationContext);
  const functions = getFunctions();

  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentNumberOfGuests, setCurrentNumberOfGuests] = useState(0);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);

  const formatDate = () => {
    const startDate = new Date(selectedDay);
    startDate.setHours(selectedTime.getHours(), 0, 0, 0);

    const endDate = new Date(selectedDay);
    endDate.setHours(selectedTime.getHours() + 1, 0, 0, 0);

    return {startDate, endDate};
  }

  const handleNextStep = () => {
    const {startDate, endDate} = formatDate(); 

    if (currentNumberOfGuests < reservation.totalGuests) {
      notification.open({message: 'Guests', description: 'Not all of your guests have been seated'});
      return;
    }

    const withTableInfo = Object.assign(reservation, {tables: selectedTables, startDate, endDate});
    setReservation(res => ({...res, ...withTableInfo}));
    setState(state + 1);
  }

  const handlePrevStep = () => {
    setState(state - 1);
  }

  const handleTableSelection = (table) => {
    const { totalGuests } = reservation;
    
    // prevents user from choosing more tables than they need
    if (currentNumberOfGuests === totalGuests && !selectedTables.includes(table)) return;

    let currSelectedTables = [...selectedTables];
    
    availableTables.forEach(item => {
      if (item.tableId === table.tableId) {
        if (!selectedTables.includes(item)) {
          currSelectedTables.push(table);
        } else {
          currSelectedTables.splice(selectedTables.indexOf(item), 1);
        }
      }
    });
  
    let count = 0;
    currSelectedTables.forEach(i => count += i.capacity);

    if (count > totalGuests) count = totalGuests;
    if (count < 0) count = 0;

    setCurrentNumberOfGuests(count);
    setSelectedTables(currSelectedTables);
  }

  const handleDateSelection = (val) => {
    setSelectedDay(new Date(val));
  }

  const handleTimeSelection = (val) => {
    setSelectedTime(new Date(val));
  }

  const fetchTables = async () => {
    const {startDate, endDate} = formatDate();
    setLoading(true);

    if (!startDate || !endDate ) return;

    // TODO: remove this after debugging
    // connectFunctionsEmulator(functions, 'localhost', 5001);

    const functionHandle = httpsCallable(functions, 'findTables');
    const { data } = await functionHandle({ startDate, endDate });
    if (data.error) {
      console.log(data);
      notification.error({ message: data.message, description: data.description });
      console.error(data.error);
      setLoading(false);
      return;
    }
    
    setLoading(false);
    setAvailableTables(data);
  }

  const renderTables = () => {
    if (availableTables.length === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 2 }}>
          {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/> : <Empty />}
        </div>)
    } else {
      return availableTables.map(table => {
        return (
          <div key={table.name} onClick={() => handleTableSelection(table)}>
            <Card hoverable style={{ borderColor: `${selectedTables.includes(table)? '#40a9ff' : 'rgb(240,240,240)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <img alt="table logo" src={require(`../../dinner-${table.icon}.png`)} height={64} width={64} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontWeight: 600, marginBlockEnd: 0 }}>{table.name}</p>
                  <p style={{  marginBlockEnd: 0  }}>Capacity: {table.capacity}</p>
                </div>
              </div>
            </Card>
          </div>
        )
      })}
    }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', maxWidth: '70rem', gap: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', flex: 2, alignContent: availableTables.length === 0 ? 'center' : 'start'}}>
          {renderTables()}
        </div>
        <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Calendar fullscreen={false} defaultValue={moment(selectedDay)} onSelect={handleDateSelection}/>
            </div>
            <div style={{ flexGrow: 0, flexBasis: 'auto', height: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
            <div>
              <TimePicker format="hh:mm A" onSelect={handleTimeSelection} minuteStep={30}/>
              <Button style={{ marginLeft: '1rem' }} onClick={fetchTables}>Find tables</Button>
            </div>
            <div style={{ flexGrow: 0, flexBasis: 'auto', height: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
            <div>
              <Statistic title="Seated guests" value={currentNumberOfGuests} suffix={`/${reservation.totalGuests}`}/>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handlePrevStep} style={{ marginRight: '1rem' }}>Back</Button>
        <Button onClick={handleNextStep} type="primary">Next ???</Button>
      </div>
    </div>
  )
}
