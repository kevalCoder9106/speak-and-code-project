import './Home.css'
import Header from '../../Components/Header/Header'
import Main from '../../Components/Main/Main'

const Home = (props) => {

    return(
        <div className='home-container'>
            <Header/>
            <div className='border'></div>
            <Main run={props.run} updateCode={props.updateCode} code={props.code} output={props.output}/>
        </div>
    )
}

export default Home