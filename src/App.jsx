import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
   const [Country, setCountry] = useState([]);
   const[State,setState] = useState([]);
   const[City,setCity] = useState([]);
   const [SelectedCountry,setselectedCounty] = useState("");
   const [SelectedState,setselectedState] = useState("");
  const[selectedcitymain,setselectedcitymain] = useState("");


   useEffect(()=>{
    const getcountries = async () => { 
    try{
    const data = await fetch("https://crio-location-selector.onrender.com/countries");
    let countries = await data.json(); 
    setCountry(countries);
    }catch(e){
      console.error(e);
    }

    }
  getcountries();
   },[]);

   const countryset = (event) => {
      setselectedCounty(event.target.value);
      setselectedState(""); // Reset State when Country changes
      setselectedcitymain("");  // Reset City when Country changes
      // console.log(SelectedCountry);
   }

   useEffect(()=>{

    const getstates = async () => { 
    
      try{
      let api = `https://crio-location-selector.onrender.com/country=${SelectedCountry}/states`;
      const data = await fetch(api);
      let States = await data.json(); 
      setState(States);
      }catch(e){
        console.error(e);
      }
    
  }
  getstates();
   },[SelectedCountry])

   useEffect(()=>{  
    const getcity = async () =>{
    try{
      let api = `https://crio-location-selector.onrender.com/country=${SelectedCountry}/state=${SelectedState}/cities`;
      let response = await fetch(api);
      let data = await response.json();
      setCity(data);
    }catch(e){
      console.error(e);
    }

    }
    getcity();

   },[SelectedState])

   const setcityname = (e) =>{
    setselectedState(e.target.value);
   }

   const setcitynamemain = (e) =>{
      setselectedcitymain(e.target.value);
   }
   

console.log(State);

  

  return (
    <div>
      <h2>
        Select Location
      </h2>
      <select onChange={countryset} style={{margin:"20px"}}>
      <option value="" disabled selected >Select Country</option>
      {
        Country.map((countries,index) => (
          <option key={index}>{countries}</option> 
        ))  
      }

      </select>
      <select disabled={!SelectedCountry} onChange={setcityname} style={{margin:"20px"}}>
      <option value="" disabled selected>Select State</option>
      {
        State.map((state,index)=>(
          <option key={index}>{state}</option>
        ))
      }

      
      </select>
      <select disabled={!SelectedState} onChange={setcitynamemain} style={{margin:"20px"}}>
      <option value="" disabled selected>Select City</option>
      {
        City.map((cities,index) =>(
          <option key={index}>{cities}</option>
        )
        )
      }      
      </select>
      <div>
      {selectedcitymain && (
            <div>
               <h4>You selected <h2>{selectedcitymain}</h2>, {SelectedState}, {SelectedCountry}</h4>
            </div>
         )}

      </div>
    </div>

  
  )
}

export default App
