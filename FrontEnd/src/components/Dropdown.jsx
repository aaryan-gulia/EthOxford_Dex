import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('UniDex');
  const options = [
    'UniDex',
    'stoch',
    'Mobula API',
    'Matcha',
    'Yield Yak',
    'Odex',
    'RBX',
    'Dexible',
    'Piper Finance',
    'Squid',
    'TraderjoeXYZ',
    'Lildex',
    'Interport Finance',
    'ShapeShift DAO',
    'WonderSwap',
    'MitcySwap',
    'BySixter',
    'OpenOcean',
    'Rubic',
    'Swapper',
    'Doodex',
    'LIFI',
    'Jungso Exchange',
    'Togro',
    'Sill',
    'alFINS',
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="selectDex">Select Network</label>
      <select id="selectDex" value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;