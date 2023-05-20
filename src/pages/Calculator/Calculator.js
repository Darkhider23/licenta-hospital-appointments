import React, { useEffect, useState } from "react";
import "./Calculator.css";

function Calculator() {
    const [items, setItems] = useState([]);
    const [sum, setSum] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://192.168.0.165:5000/analisysprices"); // Replace with your API endpoint
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    const handleAdd = (item) => {
        setSelectedItems([...selectedItems, item]);
    };

    const handleRemove = (item) => {
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    };

    useEffect(() => {
        // Calculate the sum based on the selected items
        const newSum = selectedItems.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
        setSum(newSum);
    }, [selectedItems]);

    return (
        <div className="calculator-container">
            <h1>Price Calculator</h1>
            <div className="lists-container">
                <div className="price-list">
                    {items.map((item) => (
                        <div key={item.id} className="item">
                            <div className="item-border">
                                <span>{item.name} - ${item.price}</span>
                                {selectedItems.includes(item) ? (
                                    <button onClick={() => handleRemove(item)}><i className='bx bx-minus-circle' ></i></button>
                                ) : (
                                    <button onClick={() => handleAdd(item)}>
                                        <i className="bx bx-plus-circle" ></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="selected-items">
                    <div className="selected-border">
                        {selectedItems.length > 0 && (
                            <>
                                <h2>Selected Items</h2>
                                <div className="list-border">
                                    <ul>
                                        {selectedItems.map((item) => (
                                            <li key={item.id}>{item.name} - ${item.price}</li>
                                        ))}
                                    </ul>
                                    <div className="bottom-list">
                                        <p>Total: ${sum}</p>
                                        <button className="clear-list" onClick={() => setSelectedItems([])}>Clear List</button>
                                    </div>

                                </div>
                            </>)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Calculator;
