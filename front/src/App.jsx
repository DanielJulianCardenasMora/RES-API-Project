import './App.css'
import Cards from './components/Cards/Cards'
import NavBar from './components/Nav/Nav'
import About from './components/About/About'
import Detail from './components/Detail/Detail'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Form from './components/Form/Form'




function App() {
  const { pathname } = useLocation()
  const [access, setAccess] = useState(false)
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()
  // const URL_BASE = 'https://rym2.up.railway.app/api/character/'
  // const API_KEY = 'henrystaff' ?key=${API_KEY}
  const URL_BASE = 'https://rickandmortyapi.com/api/character/'
  const EMAIL = 'daniel@mail.com'
  const PASSWORD = 'pass1234'
  


  const onSearch = (id) => {
    if (!id) return alert('ingresa un ID')
    if (characters.find(char => char.id === parseInt(id))) return alert(`Ya existe el personaje con el id ${id}`)
    
    axios.get(`${URL_BASE}${id}`)
    .then(({data}) => {
    
      if (data.name) {
        setCharacters([data, ...characters])
      }else {
        alert('No hay personajes con ese ID')
      }  
    })
    .catch(err => alert(err.message))
  }
  const onClose = (id) => {
    setCharacters(characters.filter(char => char.id !== id))
  }
  const login = ({email, password}) => {
    if (email === EMAIL && password === PASSWORD) {
      setAccess(true)
      navigate('/home')
    }
    else alert('usuario o contraseña incorrectos')
  }
  useEffect(() => {
    !access && navigate('/')
  }, [access])
  
  return (
    <div className='App'>
      {pathname != '/' && <NavBar onSearch={onSearch} />}
      <Routes> 
        <Route path='/' element={<Form login={login} />}/>
        <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
        <Route path='/about' element={ <About/> } />
        <Route path='/detail/:id' element={ <Detail/> } />
      </Routes>
      <h1>Hi</h1>
 
      <h1 style={{fontSize: '100px'}}>👍👍👍</h1>
    </div>
  )
}

export default App
