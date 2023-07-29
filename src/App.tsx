import { useId, useState } from 'react'
import './App.css'
import { handshakeTranslator } from './handshake'

function App () {
  const handlangTextAreaId = useId()
  const [handshakeString, setHandshakeString] = useState('')
  const [translatedString, setTranslatedString] = useState('')

  const handleHandLangChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHandshakeString(event.target.value)
  }

  const handleTranslate = () => {
    if (handshakeString === '') return
    const translated = handshakeTranslator([...handshakeString])
    setTranslatedString(translated)
  }

  return (
    <>
     <h1>Escribe tu mensaje en Handlang</h1>
     <textarea name="handlang" value={handshakeString} onChange={handleHandLangChange} id={handlangTextAreaId} style={{ height: '200px' }}></textarea>
     <button onClick={handleTranslate}>Traducir</button>
     <hr />
     <p>
      {translatedString}
     </p>
    </>
  )
}

export default App
