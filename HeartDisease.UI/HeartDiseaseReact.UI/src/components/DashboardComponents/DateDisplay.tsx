import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface Doctors {
  doctorId: number,
  name: string
}

interface DateDisplayProps {
  doctors: Doctors[];
}

const DateDisplay: React.FC<DateDisplayProps> = ({ doctors }) => {
  const [date, setDate] = useState('');

  /**
   * On component render sets the date state to current date and time
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(moment().toDate().toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span style={{ color: 'orange' }}>{date}</span>
      <div>
        <h2>Doctors</h2>
        <ul>
          {doctors.map((doctors) => (
            <li key={doctors.doctorId}>
                <p> {doctors.doctorId} , {doctors.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateDisplay;
