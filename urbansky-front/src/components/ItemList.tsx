'use client'

import React, { useEffect, useState } from 'react';

import Item from '../types/types'

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {serial: 21, name: 'Latex', description: 'Quality latex for balloon construction.', quantity: 237},
    {serial: 22, name: 'Paracord', description: 'Braided nylon utility rope. Weather resistant, capable of safely supporting 550lbs.', quantity: 783},
    {serial: 23, name: 'Radiosonde', description: 'Radio transmitter. Battery powered, measures atmospheric conditions and transmits them by radio to the ground', quantity: 67},
    {serial: 24, name: 'Hydrogen Canister', description: 'Pressurized canister of 99.999% pure hydrogren gas, 17 liters.', quantity: 53},
    {serial: 25, name: 'Helium Canister', description: 'Pressurized canister of professional grade helium gas, 40 cubic feet.', quantity: 17},
    {serial: 26, name: 'Sounding Rocket', description: 'Instrument carrying rocket used to carry objects to between 48 and 145 km.', quantity: 4},
    {serial: 27, name: 'Stratoflights™  Space Cam', description: '4K 60fps camera, custom designed to capture high resolution arial photography and to withstand inhospitable stratospheric consitions', quantity: 16},
    {serial: 28, name: 'Branded Ballpoint Pen', description: 'Urban Sky™ branded ballpoint pen. Blue ink, clickable. Can be used to write on many surfaces, or to pop balloons.', quantity: 1563},
  ]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const api = 'http://localhost:3001/api'

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(`${api}/items`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setItems(data.data);
  //     } catch (error: any) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItems();
  // }, []);

  const handleClick = () => {
    console.log('click', visible)
    setVisible(!visible)
  }

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=" w-full h-full">
      <ul className="float-left w-5/6">
        {items.map(item => (
          <li key={item.serial}>
            <div onClick={() => handleClick()} className="flex flex-col w-3/6 p-4 mt-4 gap-y-2 border-2 border-gray-800 hover:border-gray-500 rounded-xl cursor-pointer">
                <h2 className="text-md">{'>> ' + item.name}</h2>
                <p className="text-sm">{'current quantity: ' + item.quantity}</p>
              <p className="text-xs">{item.description}</p>

            </div>
          </li>
        ))}
        <li className="mt-4">end</li>
      </ul>
      {visible && <div className="w-full">
        <h1 className="text-xl">BOOM</h1>
      </div>}
    </div>
  );
};

export default ItemsList;