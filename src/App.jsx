import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    Home,
    StoreDetails
} from './view';
import { Sidebar } from "./components";

function App() {
  return (
    <BrowserRouter>
        <div>
            <Sidebar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/store/:name/:id" exact element={<StoreDetails />} />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
