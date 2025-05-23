import { useState} from "react";
import AddInventory from "./AddInventory";

export default function Inventory({inventory}) {
    const [selectedStore, setSelectedStore] = useState('all')
    const [showAddItem, setShowAddItem] = useState(false)

    function getCompany(company) {
        switch (company) {
            case 'Baydoon':
                return 'blue-container'
            case 'Ghenwa':
                return 'dark-green-container'
            case 'GoCami':
                return 'purple-container'
            default:
                return 'black-container'
        }
    }

    function displayInventory () {
        if(selectedStore === 'all'){
            return (
                <div className="inventory-items">
                    { inventory.length === 0 ?
                    <p>No items in inventory</p> :
                    inventory.map((item) => (
                        <div key={item.id} className="inventory-item">
                            <div className="item-info">
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className= {getCompany(item.company)}>{item.company}</p>
                                </div>
                                <p className={item.stock < 10 ? 'red-container' : 'green-container'}>Stock: {item.stock}</p>
                            </div>
                            
                            <div className="prices">
                                <div>
                                    <p>Purchase:</p>
                                    <p>${item.purchase}</p>
                                </div> 

                                <div>
                                    <p>Selling:</p>
                                    <p className={item.selling - item.purchase > 0 ? 'green' : 'red'}>${item.selling}</p>
                                </div>
                            </div>
                            <div className="profit-margin">
                                <p>Profit Margin : </p>
                                <p className={(item.selling - item.purchase)/item.selling * 100 > 30 ? 'green' : 'red'}>{Math.ceil((item.selling - item.purchase)/item.selling * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else if(selectedStore === 'baydoon'){
            return (
                <div className="inventory-items"> 
                    {inventory.filter(item => item.company === 'Baydoon').length === 0 ?
                    <p>No items in Baydoon store</p> :
                    inventory.filter((item) => item.company === 'Baydoon').map((item) => (
                        <div key={item.id} className="inventory-item">
                            <div className="item-info">
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className= "blue-container">{item.company}</p>
                                </div>
                                <p className={item.stock < 10 ? 'red-container' : 'green-container'}>Stock: {item.stock}</p>
                            </div>
                            
                            <div className="prices">
                                <div>
                                    <p>Purchase:</p>
                                    <p>${item.purchase}</p>
                                </div> 

                                <div>
                                    <p>Selling:</p>
                                    <p className={item.selling - item.purchase > 0 ? 'green' : 'red'}>${item.selling}</p>
                                </div>
                            </div>
                            <div className="profit-margin">
                                <p>Profit Margin : </p>
                                <p className={(item.selling - item.purchase)/item.selling * 100 > 30 ? 'green' : 'red'}>{Math.ceil((item.selling - item.purchase)/item.selling * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else if(selectedStore === 'ghenwa'){
            return (
                <div className="inventory-items">
                    {inventory.filter(item => item.company === 'Ghenwa').length === 0 ?
                    <p>No items in Ghenwa store</p> :
                    inventory.filter((item) => item.company === 'Ghenwa').map((item) => (
                        <div key={item.id} className="inventory-item">
                            <div className="item-info">
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className= "dark-green-container">{item.company}</p>
                                </div>
                                <p className={item.stock < 10 ? 'red-container' : 'green-container'}>Stock: {item.stock}</p>
                            </div>
                            
                            <div className="prices">
                                <div>
                                    <p>Purchase:</p>
                                    <p>${item.purchase}</p>
                                </div> 

                                <div>
                                    <p>Selling:</p>
                                    <p className={item.selling - item.purchase > 0 ? 'green' : 'red'}>${item.selling}</p>
                                </div>
                            </div>
                            <div className="profit-margin">
                                <p>Profit Margin : </p>
                                <p className={(item.selling - item.purchase)/item.selling * 100 > 30 ? 'green' : 'red'}>{Math.ceil((item.selling - item.purchase)/item.selling * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
        else if(selectedStore === 'gocami'){
            return (
                <div className="inventory-items">
                    { inventory.filter((item) => item.company === 'GoCami').length === 0 ?
                    <p>No items in GoCami store</p> :
                    inventory.filter((item) => item.company === 'GoCami').map((item) => (
                        <div key={item.id} className="inventory-item">
                            <div className="item-info">
                                <div>
                                    <p className="item-name">{item.name}</p>
                                    <p className= "purple-container">{item.company}</p>
                                </div>
                                <p className={item.stock < 10 ? 'red-container' : 'green-container'}>Stock: {item.stock}</p>
                            </div>
                            
                            <div className="prices">
                                <div>
                                    <p>Purchase:</p>
                                    <p>${item.purchase}</p>
                                </div> 

                                <div>
                                    <p>Selling:</p>
                                    <p className={item.selling - item.purchase > 0 ? 'green' : 'red'}>${item.selling}</p>
                                </div>
                            </div>
                            <div className="profit-margin">
                                <p>Profit Margin : </p>
                                <p className={(item.selling - item.purchase)/item.selling * 100 > 30 ? 'green' : 'red'}>{Math.ceil((item.selling - item.purchase)/item.selling * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }

    return (
        <main className="inventory-component">
            <div className="stores-buttons">
                <button onClick={() => setSelectedStore('all')}>All Stores</button>
                <button onClick={() => setSelectedStore('baydoon')}>Baydoon Stores</button>
                <button onClick={() => setSelectedStore('ghenwa')}>Ghenwa</button>
                <button onClick={() => setSelectedStore('gocami')}>GoCami</button>
            </div>

            <div className="inventory-header">
                <h1>Inventory Items</h1>
                <button onClick ={() => setShowAddItem(true)} className="add-item-btn">+ Add Item</button>
            </div>
            {displayInventory()}
            {showAddItem && <AddInventory  setShowAddItem = {setShowAddItem}/>}
        </main>
    )
}