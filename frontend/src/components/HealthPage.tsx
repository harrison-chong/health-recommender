import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Container
} from '@mui/material';

import BMIForm from './BMIForm';
import HealthForm from './HealthForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HealthPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 6, fontWeight: 300 }}>
        Health Assessment
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="health tabs" centered>
            <Tab label="BMI Calculator" {...a11yProps(0)} />
            <Tab label="Workout Recommender" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BMIForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HealthForm />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default HealthPage;