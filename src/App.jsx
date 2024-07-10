import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StateContext } from './context/StateContext';
import {
    Home,
    StoreDetails,
    ItemDetails,
    Payment,
    Cart
} from './view';
import { Sidebar } from "./components";

function App() {
  return (
    <BrowserRouter>
        <StateContext>
            <Sidebar />
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/store/:name/:id" exact element={<StoreDetails />} />
                <Route path="/store/:name/:id/:itemId" exact element={<ItemDetails />} />
                <Route path="/payment" exact element={<Payment />} />
                <Route path="/cart" exact element={<Cart />} />
            </Routes>
        </StateContext>
    </BrowserRouter>
  )
}

export default App
