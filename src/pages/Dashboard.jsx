import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useState, useEffect } from 'react';
import Inventory from '../components/Inventory';
import { db } from '../firebase';
import { ref, onValue, off } from "firebase/database";
import Orders from '../components/Orders';

export default function Dashboard({ onLogout }) {
    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
    };

    const [inventory, setInventory] = useState(true)
    const [orders, setOrders] = useState(false)
    const [inventoryData, setInventoryData] = useState([])
    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {
        const inventoryRef = ref(db, 'inventory')
        const handleDataChange = (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const fetchedData = Object.values(data)
                setInventoryData(fetchedData)
            } else {
                setInventoryData([])
            }
        }
        onValue(inventoryRef, handleDataChange)

        return () => {
            off(inventoryRef)
        }
    }, [])

    useEffect(()=>{
        const orderRef = ref(db, 'orders')
        const handleDataChange = (snapshot)=> {
            const data = snapshot.val()
            if (data) {
                const fetchedData = Object.values(data)
                setOrdersData(fetchedData)
                console.log("Orders data fetched:", fetchedData)
            } else {
                setOrdersData([])
                console.log("No orders data found")
            }
        }
        onValue(orderRef, handleDataChange)
        return () => {
            off(orderRef)
        }
    }, [])



    const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.purchase * item.stock, 0)
    const totalProfit = inventoryData.reduce((sum,item)=> sum + (item.selling - item.purchase) * item.stock, 0)

    return (
        <main className="dashboard-page">
            <section className='dashboard-header'>
                Inventory Dashboard
            </section>

            <div className='general-info'>
                <div>
                    <p>Total Inventory Value</p>
                    <p>${totalInventoryValue}</p>
                </div>
                <WarehouseIcon className='blue'/>
            </div>

            <div className='general-info'>
                <div>
                    <p>Total Orders</p>
                    <p>{ordersData.length}</p>
                </div>
                <ShoppingCartIcon className='green' />
            </div>

            <div className='general-info'>
                <div>
                    <p>Total Profit</p>
                    <p>${totalProfit}</p>
                </div>
                <TrendingUpIcon className='purple' />
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
                <Inventory inventory= {inventoryData}/>
            )}
            {orders && (
                <Orders
                    ordersData={ordersData}
                    inventory={inventoryData}
                />
            )}
        </main>
    )
}