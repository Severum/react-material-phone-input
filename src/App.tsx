import './checkout/Checkout'
import './App.css';
import Checkout from './checkout/Checkout';
import PhoneNumberInput from './PhoneNumber/PhoneNumberInput';
import { Box } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Checkout />
      {/* <Box component="div">
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput />
        </Box>
      </Box>
      <Box component="div">
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput data='+33612345789' />
        </Box>
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput data='0033612345789' />
        </Box>
      </Box>
      <Box component="div">
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput country='Allemagne'/>
        </Box>
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput country={49}/>
        </Box>
      </Box>
      <Box component="div">
        <Box component="div" className='main_wrapper' >
          <PhoneNumberInput country='EtatUnis' data='+1023456789'/>
        </Box>
      </Box> */}
    </div>
  );
}

export default App;
