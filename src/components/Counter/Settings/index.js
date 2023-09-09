import React from 'react';

const Settings = ({
    step,
    mode,
    autoClick,
    autoClickInterval,
    onToggleMode,
    onChangeStep,
    onChangeAutoClickInterval,
}) => (
    <div>
        <div>
            <label>
                Крок лічильника:
                <input type="number" value={step} onChange={onChangeStep} />
            </label>
        </div>
        <div>
            <label>
                Режим:
                <select value={mode} onChange={onToggleMode}>
                    <option value="add">Додавання</option>
                    <option value="subtract">Віднімання</option>
                </select>
            </label>
        </div>
        <div>
            <label>
                Інтервал автокліка (мс):
                <input
                    type="number"
                    value={autoClickInterval}
                    onChange={onChangeAutoClickInterval}
                />
            </label>
        </div>
    </div>
);

export default Settings;
