import { useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import WelcomePage from './Pages/WelcomePage/WelcomePage'

const App = () => {
  const [route,changeRoute] = useState('welcome')
  const [code,updateCode] = useState()
  
  const addCode = (codeLine) => {
    updateCode(prev => {
      return [...prev,codeLine]
    })
  }
  

  // Changing route (only welcome page -> home page)
  const updateRoute = (routeValue) => {
    changeRoute(routeValue)
  }
  
  // Run code
  const run = (code) => {
    fetch('https://api.jdoodle.com/v1/execute',{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body:{
        "clientId":"b0de483f2601a3192c69ada558952f35",
        "clientSecret":"ec0e806991051fdc52bceae3311ba75367868d989a0d1f23ad1d90c3d6ce2337",
        "script":code,
        "language":"C",
        "versionIndex":"0"
      }
    })
  }

  return(
    <div className='app background'>
      {
        route === 'home'
        ?
          <Home run={run} updateCode={updateCode} code={code}/>
        :
          <WelcomePage updateRoute={updateRoute}/>
      }
    </div>
  )
} 

export default App;
