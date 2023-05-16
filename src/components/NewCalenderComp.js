import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function CommonlyUsedComponents(props) {
  const { date1_label, time1_label, date2_label, time2_label, onStartDateChange, onStartTimeChange, onEndDateChange, onEndTimeChange} = props;

  const handleStartDateChange = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // add 1 day
    const formattedDate = newDate.toISOString().slice(0, 10);
    onStartDateChange(formattedDate);
    console.log(`Registration start date: ${formattedDate}`);
  };
  
  const handleEndDateChange = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // add 1 day
    const formattedDate = newDate.toISOString().slice(0, 10);
    onEndDateChange(formattedDate);
    console.log(`Registration end date: ${formattedDate}`);
  };
  
  const handleStartTimeChange = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // add 1 day
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:00`;
    onStartTimeChange(formattedTime);
    console.log(`Registration start time: ${formattedTime}`);
  };
  
  const handleEndTimeChange = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // add 1 day
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:00`;
    onEndTimeChange(formattedTime);
    console.log(`Registration end time: ${formattedTime}`);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date1_label} onChange={handleStartDateChange} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <DatePicker label={date2_label} onChange={handleEndDateChange} />
          </div>
        </div>

        <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time1_label} onChange={handleStartTimeChange} />
          </div>

          <div style={{ marginLeft: 6, marginBottom: 10, marginTop: 5 }}>
            <TimePicker label={time2_label} onChange={handleEndTimeChange} />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export { CommonlyUsedComponents };
