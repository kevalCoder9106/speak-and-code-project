import './Output.css'

const Output = (props) => {
    return(
        <div className='font-mono output-container'>
            <h3>{props.title}</h3>
        </div>
    )
}

export default Output