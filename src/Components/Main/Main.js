import './Main.css'
import Editor from './Editor/Editor'
import Output from './Output/Output'

const Main = (props) => {
    const run = (code) => {
        props.run(props.code)
    }
    return(
        <div className='main-container'>
            <Editor updateCode={props.updateCode}/>
            <div className='run-button'>
                <button onClick={run}>Run</button>
            </div>
            <Output/>
        </div>
    )
}

export default Main