'use client'

import React, { useEffect, useState } from 'react';

import Item from '../types/types';

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState<Item | null>()
  const [editting, setEditting] = useState<boolean>(false)

  const api = 'http://localhost:3001/api'

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${api}/items`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json();
        setItems(data.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleClick = (item: Item) => {
    setVisible(true)
    setCurrentItem(item)
  }

  const editItem = (item: Item) => {
    setEditting(true)
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex relative w-full">
      <ul className="w-3/6 min-w-0">
        {items.map(item => (
          <li onClick={() => handleClick(item)} key={item.serial}>
            <div className="flex flex-col w-4/6 p-4 mt-4 gap-y-2 border-2 border-gray-800 hover:border-gray-500 rounded-xl cursor-pointer">
                <div className="flex relative">
                  <h2 className="text-sm">{'>> ' + item.name}</h2>
                  <p className="absolute font-normal text-xs right-0 top-0">x{item.quantity}</p>
                </div>
              <p className="font-normal text-xs">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="sticky w-3/6 h-5/6 min-w-0 top-0 p-4">
        {visible && 
          <div className="flex flex-col relative w-96 p-4 border-2 border-gray-800 rounded-xl gap-y-4">
            {currentItem &&
              <>
                {editting ?
                  <>
                    <form>
                      <div className="relative w-full max-w-lg">
                        <div onClick={() => setEditting(false)} className="absolute font-normal text-xl right-0 top-0 pt-2 pr-4 cursor-pointer hover:color-red-500">X</div>
                        <div className="flex flex-col gap-y-2 p-4">
                          <label className="block uppercase text-xs font-bold mb-2">Name</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.name} />
                          <label className="block uppercase text-xs font-bold mb-2">Serial Number</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.serial.toString()} />
                          <label className="block uppercase text-xs font-bold mb-2">Quantity</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.quantity.toString()} />
                          <label className="block uppercase text-xs font-bold mb-2">Description</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.description} />
                        </div>
                        <div className="flex flex-row gap-x-2 pr-4 pl-4">
                          <button className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">Submit</button>
                        </div>
                      </div>
                    </form>
                  </>
                  :
                  <>
                    <div onClick={() => editItem(currentItem && currentItem)} className="absolute font-normal text-xs right-0 top-0 p-4 cursor-pointer">edit</div>
                    <h2 className="text-xl">{currentItem && currentItem.name}</h2><div className="flex gap-x-2">
                    <p className="font-normal text-sm">Quantity On Hand:</p>
                    <p className="font-normal text-sm">{currentItem && currentItem.quantity}</p>
                    </div><div className="flex gap-x-2">
                      <p className="font-normal text-sm">Serial Number:</p>
                      <p className="font-normal text-sm">{currentItem && currentItem.serial}</p>
                    </div><p className="font-normal text-sm">Item Description:</p><p className="font-normal text-xs">{currentItem && currentItem.description}</p>
                  </>
                }
              </>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default ItemsList;