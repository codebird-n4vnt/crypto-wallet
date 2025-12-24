
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Center from './components/Centre';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Center/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
