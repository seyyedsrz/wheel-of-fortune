import './styles/App.css';
import './styles/style.css';
import SpinWheel from './components/SpinWeel';

import spins from './spins.json'
import { Box } from '@mui/material';

function App() {
console.log("🚀 ~ Spins:", spins)
  
  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ display: "flex", justifyContent: { md: "space-between", xs: "center" }, mt: { md: "81px", xs: "100px" }, flexWrap: "wrap", gap: "25px" }}>
          {spins?.length ? spins.map((spin, index) => {
            return <SpinWheel spin={spin} key={index} />
          }) : ""}
        </Box>
      </header>
    </div>
  );
}

export default App;


