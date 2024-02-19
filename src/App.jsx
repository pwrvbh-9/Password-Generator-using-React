import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numbers, setnumbers] = useState(false)
  const [characters, setcharacters] = useState(false)
  const [password, setpassword] = useState("")
  const [copied, setCopied] = useState(false);

  //reference hook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) {
      str += "0123456789"
    }
    if(characters) {
      str += "!@#$%&*+-"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)    
    }

    setpassword(pass)
    setCopied(false);

  }, [length, numbers, characters, setpassword])

  const copyPassToClipboard = useCallback(() => {
  passwordRef.current?.select()
  // passwordRef.current?.setSelectionRange(0,15)
  window.navigator.clipboard.writeText(password)
  setCopied(true);
  }, [password])

  useEffect(() => {passwordGenrator()},
  [length, numbers, characters, passwordGenrator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 bg-gray-600'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3 mb-1 rounded-lg'
        placeholder='password' readOnly ref={passwordRef}>
        </input>
        <button className='outline-none rounded-lg bg-blue-700 text-white px-3 mb-1 py-2 mx-1' 
        onClick={copyPassToClipboard}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
            <input className='mb-2 cursor-pointer' type='range' min={8} max={20} value={length}
            onChange={(e) => {setlength(e.target.value)}}
            ></input>
            <label className='text-white mb-2'>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input className='rounded mb-2'  
          type='checkbox' defaultChecked={numbers} id='numberInput' 
          onChange={() => {setnumbers((prev) => !prev)}}>
          </input>
          <label className='text-white mb-2'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input className='rounded mb-2'  
          type='checkbox' defaultChecked={characters} id='characterInput' 
          onChange={() => {setcharacters((prev) => !prev)}}>
          </input>
          <label className='text-white mb-2'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
