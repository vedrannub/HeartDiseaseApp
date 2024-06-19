import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import StyledCard from '../Common/StyledCard';
import { LocalPharmacy as LocalPharmacyIcon } from '@mui/icons-material';



interface Medication {
  name: string;
  dosage: string;
  instructions: string;
}

const medications: Medication[] = [
  { name: 'Atorvastatin', dosage: '10mg', instructions: 'Take once daily with food.' },
  { name: 'Lisinopril', dosage: '20mg', instructions: 'Take once daily in the morning.' },
  { name: 'Metformin', dosage: '500mg', instructions: 'Take twice daily with meals.' },
];

const CurrentMedications: React.FC = () => {
    return (
      <StyledCard  >
        <CardContent >
          <Typography variant="h6" gutterBottom>
            Current Medications
          </Typography>
          <List>
            {medications.map((medication, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee', alignItems: 'flex-start' }}>
                <LocalPharmacyIcon sx={{ color: 'red', marginRight: '10px' }} />
                <ListItemText
                  primary={<Typography variant="subtitle1">{medication.name}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {medication.dosage}
                      </Typography>
                      {' — '}
                      <Typography component="span" variant="body2">
                        {medication.instructions}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    );
  };
  
  export default CurrentMedications;