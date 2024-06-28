import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    Home,
    StoreDetails,
    ItemDetails
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
                <Route path="/store/:name/:id/:itemId" exact element={<ItemDetails />} />
            </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
