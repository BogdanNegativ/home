import React from 'react';



const Display = ({ count, onToggleAutoClick, autoClick }) => (
    <div>
        <h2>Відображення</h2>
        <p>Значення лічильника: {count}</p>
        <button onClick={onToggleAutoClick}>
            {autoClick ? 'Стоп' : 'Старт'}
        </button>
    </div>
);

export default Display;
