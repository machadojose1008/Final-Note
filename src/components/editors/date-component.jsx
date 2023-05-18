import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const formatDate = (date) => {
  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleDateString('pt-BR', options);
};



const DateComponent = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    console.log(date);
    setFormattedDate(formatDate(date));
  }, [date])


  return (
    <div>
      {formattedDate === null ? (
        null
      ) : (
        <Typography sx={{ paddingTop: '25px' }} variant="body1" color={'black'}>
          Última Atualização {formattedDate}
        </Typography>
      )}
    </div>
  );
};

export default DateComponent;
