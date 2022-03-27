import './WelcomePage.css'

const WelcomePage = (props) => {
    return(
        <div className='welcome-container'> 
            <div className='content'>
                <h1 className='font-mono title'>Welcome coders!</h1>
                <select name='lang' className='font-mono lang-list'>
                    <option value='c'>C</option>
                    <option value='java>'>Java</option>
                    <option value='python'>Python</option>
                    <option value='cpp'>C++</option>
                </select>
                <button onClick={() => props.updateRoute('home')} className='font-mono'>{'Next'}</button>
            </div>
        </div>
    )
}

export default WelcomePage