
import "../App.css"
import Sidebar from './Sidebar';

import logo from "../CentreLogo.png"


const Centre : React.FC = () => {
  

  

  return (
    <>
    
    <Sidebar/>
    <div className='flex items-center flex-col h-screen text-pri font-exo  '>
      <img src={logo} alt="logo" className='w-80 -mt-6'/>

      <div className="h-50 flex justify-center items-center bg-gray-100 w-300">
        <p className='text-4xl '>$0.17</p>
      </div>


      <div className="text-center mt-2">
        <span className="mx-1 p-1.5 "><button className="buttons">Send</button></span>
        <span className="mx-1 p-1.5"><button className="buttons">Swap</button></span>
        
      </div>

      <div id="assets" className="flex flex-col my-3">
        <div id="assets-header" className="justify-start text-start bg-red-200 w-300">
          Tokens
        </div>
        <div id="assets-box" className="items-start mx-30">
          <div className="assets-box-elements flex justify-between">
            <div className="">Bitcoin</div>
            <div>0.00004</div>
            <div className="">150$</div>
          </div>
          <div className="assets-box-elements">Solana</div>
          <div className="assets-box-elements">Ethereum</div>
        </div>
      </div>
      
      
    </div>
    </>
  )
}

export default Centre