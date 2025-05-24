import { useState } from 'react';
import { db } from '../firebase';
import { ref, remove, set } from 'firebase/database';
import AddOrder from './AddOrder';

export default function Orders ({ordersData, inventory}) {

    const [showAddOrder, setShowAddOrder] = useState (false)

    async function handleCompleted(orderId){
        try {
            const orderToDelete = ordersData.filter(order => order.id === orderId)[0]

            if (!orderToDelete) {
                console.error("Order not found");
                return;
            }
            const inventoryUpdates = {};

            for (const orderedItem of orderToDelete.order) {
                const inventoryItem = inventory.find(item => item.name === orderedItem.name);
                if (inventoryItem) {
                    const newStock = inventoryItem.stock - orderedItem.quantity;
                    const updatedItem = {
                        ...inventoryItem,
                        stock: newStock
                    };
                    inventoryUpdates[inventoryItem.id] = updatedItem;
                }
            }

            const updatePromises = Object.entries(inventoryUpdates).map(([itemId, updatedItem]) =>
                set(ref(db, `inventory/${itemId}`), updatedItem)
            );

            const removeOrderPromise = remove(ref(db, `orders/${orderId}`));

            await Promise.all([...updatePromises, removeOrderPromise]);

            console.log("Order completed and synced with database successfully");

        } catch (error) {
            console.error("Error completing order:", error);
        }
    }

    return (
        <main className="orders-component">
            <div className="orders-header">
                <h2>Orders</h2>
                <button className="order-add-btn" onClick={() => setShowAddOrder(true)}>+ Add Order</button>
            </div>

            {ordersData.length > 0 ? (
                <div className="orders-list">
                {ordersData.map((order) => (
                    <div key={order.id} className="order-card">
                        <div>
                            <div>
                                <h3>{order.fullName}</h3>
                                <p>Phone: {order.phone}</p>
                            </div>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                    <div className="order-items">
                        <h4>Items:</h4>
                        {order.order.map((item, index) => (
                            <div key={index} className="order-item">
                                <p>{item.quantity}x {item.name}</p>
                                <p>${item.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="order-actions">
                    <p><strong>Total: ${order.order.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</strong></p>
                    <button onClick={() => handleCompleted(order.id)}>Completed</button>
                    </div>

                    </div>
                        ))}
                </div>
                    ) : (
                        <p>No orders found</p>
                    )}
            {showAddOrder && <AddOrder setShowAddOrder={setShowAddOrder} inventory={inventory} />}
        </main>
    )
}