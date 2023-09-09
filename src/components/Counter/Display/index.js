import React from 'react';

const Display = ({ count, onToggleAutoClick, autoClick, onManualStep, mode }) => (
    <div>
        <p>Значення : {count}</p>
        <button onClick={onManualStep}>{mode == 'add' ? 'Додати' : 'Відняти'}</button>
        <button onClick={onToggleAutoClick}>
            {autoClick ? 'Стоп' : 'Старт'}
        </button>

    </div>
);

export default Display;
