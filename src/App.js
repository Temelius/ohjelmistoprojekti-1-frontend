import React, { useState } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RadioKysymys from './components/RadioKysymys';
import AvoinKysymys from './components/AvoinKysymys';

function App() {

  const [value, setValue] = useState('radio');

  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
      <AppBar position="static" style={{ background: '#1E90FF' }}>
        <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{style: {background:'#ff7b00'}} }>
          <Tab value="radio" label="Radio Kysymys" />
          <Tab value="avoin" label="Avoin kysymys" />
        </Tabs>
      </AppBar>
      <br></br>
      {value === 'radio' && <div><RadioKysymys /></div>}
      {value === 'avoin' && <div><AvoinKysymys /></div>}

    </div>
  );
}
export default App;