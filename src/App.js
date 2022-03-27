import { useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import WelcomePage from './Pages/WelcomePage/WelcomePage'

const App = () => {
  const [route,changeRoute] = useState('welcome')
  const [code,updateCode] = useState()
  const [output,updateOutput] = useState('Output')

  
  // Changing route (only welcome page -> home page)
  const updateRoute = (routeValue) => {
    changeRoute(routeValue)
  }
  
  // Run code
  const run = (_code) => {
    const data = {
      userCode: _code
    }

    fetch('http://localhost:300/send_code',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(result => {
      result = result.output.split("\n")[0]
      updateOutput(result)
    })
    .catch(err => console.log(err))
  }

  return(
    <div className='app background'>
      {
        route === 'home'
        ?
          <Home run={run} updateCode={updateCode} code={code} output={output}/>
        :
          <WelcomePage updateRoute={updateRoute}/>
      }
    </div>
  )
} 

export default App
