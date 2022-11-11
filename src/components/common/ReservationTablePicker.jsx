import React, { useContext, useState } from 'react'
import { Card, Typography, Statistic, Button } from 'antd';


import table2 from '../../dinner-table-2.png'; 
import table4 from '../../dinner-table-4.png';
import table6 from '../../dinner-table-6.png';
import table8 from '../../dinner-table-8.png';
import { ReservationContext } from '../routes/ReservePage';

const { Title, Text } = Typography;

const tables = [
  { id: 1, name: 'Table 1', capacity: 4, isVacant: true, startDate: 0, endDate: 0, icon: table4, isSelected: false },
  { id: 2, name: 'Table 2', capacity: 8, isVacant: true, startDate: 0, endDate: 0, icon: table8, isSelected: false },
  { id: 3, name: 'Table 3', capacity: 2, isVacant: true, startDate: 0, endDate: 0, icon: table2, isSelected: false },
  { id: 4, name: 'Table 4', capacity: 6, isVacant: true, startDate: 0, endDate: 0, icon: table6, isSelected: false },
  { id: 5, name: 'Table 5', capacity: 4, isVacant: true, startDate: 0, endDate: 0, icon: table4, isSelected: false },
];

export default function ReservationTablePicker() {
  const { state, setState, reservation, setReservation } = useContext(ReservationContext);

  const [currentNumberOfGuests, setCurrentNumberOfGuests] = useState(0);
  const [availableTables, setAvailableTables] = useState(tables);
  const [selectedTables, setSelectedTables] = useState([]);

  const handleNextStep = () => {
    const withTableInfo = Object.assign(reservation, {tables: selectedTables});

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
      if (item.id === table.id) {
        item.isSelected = !item.isSelected;
        if (item.isSelected) {
          currSelectedTables.push(table);
        } else {
          currSelectedTables = currSelectedTables.filter(i => i.isSelected);
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

  console.log(reservation);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', maxWidth: '60rem', gap: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', flex: 4 }}>
          {availableTables.map(table => {
            return (
              <div key={table.id} onClick={() => handleTableSelection(table)}>
                <Card hoverable style={{ borderColor: `${table.isSelected ? '#40a9ff' : 'rgb(240,240,240)'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <img src={table.icon} height={64} width={64} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p style={{ fontWeight: 600, marginBlockEnd: 0 }}>{table.name}</p>
                      <p style={{  marginBlockEnd: 0  }}>Capacity: {table.capacity}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
        <div style={{ flexGrow: 0, flexBasis: 'auto', width: 1.5, backgroundColor: 'rgb(240,240,240)' }} />
        <div style={{ flex: 1 }}>
          <Statistic title="Seated guests" value={currentNumberOfGuests} suffix={`/${reservation.totalGuests}`}/>
          <br/>
          <Text type="secondary">Date</Text>
          <br/>
          <Text>Test</Text>
          <br/>
          <br/>
          <Text type="secondary">Time</Text>
          <br/>
          <Text>Test</Text>
        </div>
      </div>
      <div>
        <Button onClick={handlePrevStep} style={{ marginRight: '1rem' }}>Back</Button>
        <Button onClick={handleNextStep} type="primary">Next ➜</Button>
      </div>
    </div>
  )
}
