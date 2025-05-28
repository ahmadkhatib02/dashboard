import { useState} from "react";
import AddInventory from "./AddInventory";
import { db } from '../firebase';
import { ref, remove, set } from 'firebase/database';

export default function Inventory({inventory}) {
    const [selectedStore, setSelectedStore] = useState('all')
    const [showAddItem, setShowAddItem] = useState(false)
    const [showEditItem, setShowEditItem] = useState([false, " "])

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


    async function handleRemoveItem (itemId) {
        try {
            const inventoryToDelete = inventory.filter(item => item.id === itemId)[0]

            if (!inventoryToDelete) {
                console.error("Item not found");
                return;
            }
            await remove(ref(db, `inventory/${itemId}`));

            console.log(`Successfully removed item: ${inventoryToDelete.name}`);

        } catch (error) {
            console.error("Error removing item:", error);
        }
    }

    function handleEditItem (itemId) {
        const itemToEdit = inventory.filter(item => item.id === itemId) [0]
        const name = itemToEdit.name
        const company = itemToEdit.company
        const purchase = itemToEdit.purchase
        const selling = itemToEdit.selling
        const stock = itemToEdit.stock

        function handleEditForm (e) {
            e.preventDefault()
            const formDataAPI = new FormData(e.target)
            const name = formDataAPI.get('name')
            const company = formDataAPI.get('company')
            const purchase = Number(formDataAPI.get('purchase'))
            const selling = Number(formDataAPI.get('selling'))
            const stock = Number(formDataAPI.get('stock'))

            const updatedItem = {
                id: itemId,
                name,
                company,
                purchase,
                selling,
                stock
            }

            set(ref(db, `inventory/${itemId}`), updatedItem)
                .then(() => {
                    setShowEditItem([false, " "])
                })
                .catch((error) => {
                    console.error("Error editing item:", error)
                })
        }

        return (
            <section className="edit-item-container">
                <div className="add-item-header">
                    <h3>Edit {name}</h3>
                    <button onClick={()=>setShowEditItem([false, " "])}>X</button>
                </div>
                <form onSubmit={(e) => handleEditForm(e)}>
                    <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" name="name" id="name" defaultValue={name} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Select Company</label>
                            <select name="company" id="company" defaultValue={company} required>
                                <option value="" disabled selected>Select Company</option>
                                <option value="Baydoon">Baydoon</option>
                                <option value="Ghenwa">Ghenwa</option>
                                <option value="GoCami">GoCami</option>
                            </select>
                    </div>

                    <div className="price-add">
                        <div className="form-group">
                            <label htmlFor="stock">Stock Quantity</label>
                            <input type="number" name="stock" id="stock" min="0" defaultValue={stock} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="purchase">Purchase Price</label>
                            <input type="number" name="purchase" id="purchase" min="0" step="0.01" defaultValue={purchase} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="selling">Selling Price</label>
                        <input type="number" name="selling" id="selling" min="0" step="0.01" defaultValue={selling} required />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="add-item-btn">Edit Item</button>
                    </div>
                </form>
            </section>
        )

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

                            <div>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <button className="edit-btn" onClick={() => setShowEditItem([true, item.id])}>Edit</button>
                            </div>
                            {(showEditItem[0] && showEditItem[1] === item.id) && handleEditItem(item.id)}
                            
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

                            <div>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <button className="edit-btn" onClick={() => setShowEditItem([true, item.id])}>Edit</button>
                            </div>
                            {(showEditItem[0] && showEditItem[1] === item.id) && handleEditItem(item.id)}
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

                            <div>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <button className="edit-btn" onClick={() => setShowEditItem([true, item.id])}>Edit</button>
                            </div>
                            {(showEditItem[0] && showEditItem[1] === item.id) && handleEditItem(item.id)}
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

                            <div>
                                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <button className="edit-btn" onClick={() => setShowEditItem([true, item.id])}>Edit</button>
                            </div>
                            {(showEditItem[0] && showEditItem[1] === item.id) && handleEditItem(item.id)}
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