import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useState } from 'react';
import Inventory from '../components/Inventory';

export default function Dashboard({ onLogout }) {
    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
    };

    const [inventory, setInventory] = useState(true)
    const [orders, setOrders] = useState(false)


    return (
        <main className="dashboard-page">
            <section className='dashboard-header'>
                Inventory Dashboard
            </section>

            <div className='general-info'>
                <div>
                    <p>Total Inventory Value</p>
                    <p>8220</p>
                </div>
                <InventoryIcon className='blue'/>
            </div>

            <div className='general-info'>
                <div>
                    <p>Total Sales</p>
                    <p>1200</p>
                </div>
                <ShoppingCartIcon className='green' />
            </div>

            <div className='general-info'>
                <div>
                    <p>Total Profit</p>
                    <p>7020</p>
                </div>
                <KeyboardDoubleArrowUpIcon className='purple' />
            </div> 

            <div className='nav-buttons'>
                <button onClick={() => {
                    setInventory(true)
                    setOrders(false)
                }}>Inventory</button>
                <button onClick={() => {
                    setInventory(false)
                    setOrders(true)
                }}>Orders</button>
            </div>
            {inventory && (
                <Inventory />
            )}
            {orders && (
                <div>
                    <h2>Orders</h2>
                    <p>Orders content goes here</p>
                </div>
            )}
        </main>
    )
}