import { Alchemy, Network, Utils} from 'alchemy-sdk';
import { useEffect, useState } from 'react';


import './App.css';
import './styles/global.css';





// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);


function App() {
  
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  const [gasPrice, setGasPrice] = useState();
  useEffect(() => {
    const getGasPrice = async () => {
      const result = await alchemy.core.getGasPrice();
      let amount = Utils.formatUnits(result, "gwei");
      setGasPrice(amount);
    }
    getGasPrice();
  });

  const [balance, setBalance] = useState(null);
  const [address, setAddress] = useState('');
  const [searchInput, setSearchInput] = useState("");
  useEffect (() => {
    const getBalance = async () => {
      
     function handleInputChange(event) {
      setSearchInput(event.target.value);
     }
     async function handleSearch() {
      const getAddress = await getAddress(searchInput);
      setAddress(handleInputChange);
     }
     handleSearch();


      const result = await alchemy.core.getBalance(address, "latest");
      let amount = Utils.formatUnits(result, "gwei");
      setBalance(amount);
    
    }
    getBalance();

    
    
  });

  

  return [
  <div
    className='border'
    >,
  
  <div 
     className="App"><h1>Block Number: {blockNumber}</h1>
  </div>,

  <div 
     className="App"><h1>Gas Price: {gasPrice}</h1>
  </div>,
  
  <div 
     className="App"><h1>Balance: {balance}</h1>
     
     
     <input
     
     type="text"
     value={address}
     onChange={(e) => setAddress(e.target.value)}/>
     
     

      
  </div>,

  
  

  </div>
  
 
]
}

export default App;
