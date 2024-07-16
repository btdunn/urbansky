'use client'

import * as yup from "yup";

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

import Item from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';

const ItemsList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleNewItemForm, setVisibleNewItemForm] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState<Item | null>()
  const [editting, setEditting] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

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
  }, [items]);

  type FormData = yup.InferType<typeof schema>

  const schema = yup.object({
    serial: yup.number().required().positive(),
    name: yup.string().required(),
    description: yup.string().required(),
    quantity: yup.number().required().positive()
  })
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmitEdit = async (data: FormData) => {
    setLoading(true);
    
    try {
      if (currentItem) {
      const response = await fetch(`${api}/items/${currentItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === currentItem.id ? updatedItem : item))
      );
    };
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitNew = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await fetch(`${api}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const newItem = await response.json();
      setItems((prevItems) => [...prevItems, newItem]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

  const handleClick = (item: Item) => {
    setVisible(true)
    setCurrentItem(item)
  }

  const editItem = () => {
    setEditting(true)
  }

  const showNewItemForm = () => {
    setVisibleNewItemForm(true)
  }

  const handleDelete = () => {
    setDeleting(true)
  }

  const deleteItem = async (chosenItem: Item) => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/items/${chosenItem.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems((prevItems) => prevItems.filter(item => item.id !== chosenItem.id));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
      setDeleting(false);
    }
  }
    
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex relative w-full">
      <ul className="w-3/6 min-w-0">
        {items.map(item => (
          <li onClick={() => handleClick(item)} key={item.id}>
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
      <div className="sticky flex flex-col w-3/6 h-5/6 min-w-0 top-0 p-4 gap-y-4">
        {visible && 
          <div className="flex flex-col relative w-96 p-4 border-2 border-gray-800 rounded-xl gap-y-4">
            {currentItem &&
              <>
                {editting ?
                  <>
                    {deleting ?
                    <div className="relative w-full max-w-lg">
                      <h3 className="text-normal font-bold">Delete this item?</h3>
                      <p className="text-sm font-normal mt-4">This cannot be undone</p>
                      <div className="flex flex-row gap-x-2 mt-4">
                        <button className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" onClick={() => deleteItem(currentItem)}>Delete</button>
                        <button className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" onClick={() => setDeleting(false)}>Cancel</button>
                      </div>

                    </div>
                    :
                    <form onSubmit={handleSubmit(onSubmitEdit)}>
                      <div className="relative w-full max-w-lg">
                        <div onClick={() => setEditting(false)} className="absolute font-normal text-xl right-0 top-0 pt-2 pr-4 cursor-pointer hover:color-red-500">X</div>
                        <div className="flex flex-col gap-y-2 p-4">
                          <label className="block uppercase text-xs font-bold mb-2">Name</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.name} {...register("name")} />
                          <label className="block uppercase text-xs font-bold mb-2">Serial Number</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.serial.toString()} {...register("serial", {min: 0})} />
                          <label className="block uppercase text-xs font-bold mb-2">Quantity</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.quantity.toString()} {...register("quantity")} />
                          <label className="block uppercase text-xs font-bold mb-2">Description</label>
                          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xs" type="text" placeholder={currentItem.description} {...register("description")} />
                        </div>
                        <div className="flex flex-row gap-x-2 pr-4 pl-4">
                          <button className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Submit</button>
                          <button onClick={handleDelete} className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Delete</button>
                        </div>
                      </div>
                    </form>
                    }
                  </>
                  :
                  <>
                    <div onClick={() => editItem()} className="absolute font-normal text-xs right-0 top-0 p-4 cursor-pointer">edit</div>
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
          <div>
          {visibleNewItemForm ?
            <form className="w-96 p-4 border-2 border-gray-800 rounded-xl" onSubmit={handleSubmit(onSubmitNew)}>
              <div className="relative w-full max-w-lg">
                <div onClick={() => setVisibleNewItemForm(false)} className="absolute font-normal text-xl right-0 top-0 pt-2 pr-4 cursor-pointer hover:text-red-500">X</div>
                <div className="flex flex-col gap-y-2 p-4">
                  <label className="block uppercase text-xs font-bold mb-2">Name</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white text-sm" type="text" placeholder={'Name'} {...register("name", { required: true })} />
                  <p className="text-xs text-red-500 mb-2">{errors.name?.message && 'Name is required'}</p>
                  <label className="block uppercase text-xs font-bold mb-2">Serial Number</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white text-sm" type="text" placeholder={'Serial Number'} {...register("serial", { required: true, min: 0})} />
                  <p className="text-xs text-red-500 mb-2">{errors.serial?.message && 'Serial number is required'}</p>
                  <label className="block uppercase text-xs font-bold mb-2">Quantity</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white text-sm" type="text" placeholder='Quantity' {...register("quantity", { required: true })} />
                  <p className="text-xs text-red-500 mb-2">{errors.quantity?.message && 'Quantity is required'}</p>
                  <label className="block uppercase text-xs font-bold mb-2">Description</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white text-sm" type="text" placeholder='Description' {...register("description", { required: true })} />
                  <p className="text-xs text-red-500 mb-2">{errors.description?.message && 'Description is required'}</p>
                </div>
                <div className="flex flex-row gap-x-2 pr-4 pl-4">
                  <button className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Submit</button>
                </div>
              </div>
            </form>
          :
            <button onClick={showNewItemForm} className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded-full" type="submit">New Item</button>
          }
        </div>
      </div>
    </div>
  );
};

export default ItemsList;