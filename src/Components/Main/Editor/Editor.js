import { useState,useEffect } from 'react'
import { findRenderedComponentWithType } from 'react-dom/test-utils'
import './Editor.css'

const Editor = (props) => {
    const [code,changeCode] = useState([])
    const [err,updateErr] = useState(0)

    const num_alp = ['zero','one','two','three','four','five','eight']
    const num = [0,1,2,3,4,5,8]

    useEffect(() => {
        listen()
        updateCode()
    })

    const addCode = (newCode) => {
        changeCode(prev => {
            return[...prev,newCode]
        })
    }

    const confNum = (n) => {
        for (let i = 0; i < num_alp.length; i++){
            if (n.toString() === num_alp[i]){
                return num[i]
            }
        }

        return n
    }

    const splitWords = (sent) => {
        const words = sent.split(" ")
        
        return words
    }

    const find_intent = (sent) => {
        const words = splitWords(sent)
        let code = 'printf("'

        if (words[0] === 'print' || words[0] === 'Print'){
            for (let i = 0; i < words.length; i++){
                if (i != 0){
                    code += words[i] + " "
                }
            }
            code += '");'
            return code
        }
        else if (words[0] == 'Loop' && words[1] == 'till'){
            const a = confNum(words[2])
            const msg = words[5]

            code = 'for(int i = 0; i <= ' + a + '; i++){\n\tprintf("'

            for (let i = 5; i < words.length; i++){
                if (i != 0){
                    code += words[i] + " "
                }
            }

            code += '");\n}'

            return code
        }
        else if (words[0] == 'Declare'){
            const dt = words[1]
            const name = words[2]
            const value = words[4]

            code = dt + " " + name + " = " + value + ";"

            return code
        }
        else{
            return 0
        }
    }

    const listen = () => {
        // new speech recognition object
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
                    
        // This runs when the speech recognition service starts
        recognition.onstart = function() {
            console.log("We are listening. Try speaking into the microphone.");
        };

        recognition.onspeechend = function() {
            // when user is done speaking
            recognition.stop();
        }
                    
        // This runs when the speech recognition service returns result
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            var confidence = event.results[0][0].confidence;
            
            const newCode = find_intent(transcript)

            if (newCode != 0){
                console.log(newCode)
                addCode(newCode)
                updateCode()
            }
            else{
                updateErr(err + 1)
            }
        };
                    
        // start recognition
        recognition.start();
    }

    const updateCode = () => {
        const textEditor = document.getElementById('editor')
        textEditor.value = '#include<stdio.h>\nvoid main(){\n'

        code.map(c => {
            textEditor.value = (textEditor.value ? textEditor.value + '\n' : "")  + c
        })

        textEditor.value = textEditor.value + '\n}'

        props.updateCode(textEditor.value)
    }

    return(
        <textarea id='editor' placeholder='Code' className='font-mono editor-container'>

        </textarea>
    )
}

export default Editor