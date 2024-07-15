import { beforeEach, expect, test } from 'vitest'

import { Item } from '../src/models/Item'
import app from '../src/app'
import config from '../knexfile'
import { knex } from 'knex'
import request from 'supertest'
import { seed } from '../src/database/seeds/items'

const seedData = [ {serial: 21, name: 'Latex', description: 'Quality latex for balloon construction.', quantity: 237},
  {serial: 22, name: 'Paracord', description: 'Braided nylon utility rope. Weather resistant, capable of safely supporting 550lbs.', quantity: 783},
  {serial: 23, name: 'Radiosonde', description: 'Radio transmitter. Battery powered, measures atmospheric conditions and transmits them by radio to the ground', quantity: 67},
  {serial: 24, name: 'Hydrogen Canister', description: 'Pressurized canister of 99.999% pure hydrogren gas, 17 liters.', quantity: 53},
  {serial: 25, name: 'Helium Canister', description: 'Pressurized canister of professional grade helium gas, 40 cubic feet.', quantity: 17},
  {serial: 26, name: 'Sounding Rocket', description: 'Instrument carrying rocket used to carry objects to between 48 and 145 km.', quantity: 4},
  {serial: 27, name: 'Stratoflights™  Space Cam', description: '4K 60fps camera, custom designed to capture high resolution arial photography and to withstand inhospitable stratospheric consitions', quantity: 16},
  {serial: 28, name: 'Branded Ballpoint Pen', description: 'Urban Sky™ branded ballpoint pen. Blue ink, clickable. Can be used to write on many surfaces, or to pop balloons.', quantity: 1563},
]

const database = knex(config)

beforeEach( async () => await seed(database))

test('GET /api/items', async () => {
  const response = await request(app).get('/api/items')
  expect(response.body.data).toEqual([
    expect.objectContaining(seedData[0]),
    expect.objectContaining(seedData[1]),
    expect.objectContaining(seedData[2]),
    expect.objectContaining(seedData[3]),
    expect.objectContaining(seedData[4]),
    expect.objectContaining(seedData[5]),
    expect.objectContaining(seedData[6]),
    expect.objectContaining(seedData[7]),
  ])
})

test('GET /api/items/:id', async () => {
  const items = await request(app).get('/api/items')
  const item = items.body.data[0]
  const response = await request(app).get(`/api/items/${item.id}`)
  expect(response.body.data).toEqual(item)
})

test('POST /api/items', async () => {
  const testItem = {
    serial: 2,
    name: 'test',
    description: 'test desc',
    quantity: 6
  }

  const response = await request(app).post('/api/items').send(testItem)
  expect(response.body.data).toMatchObject(testItem)
})

test('DELETE /api/items/:id', async () => {
  const items = await request(app).get('/api/items')
  const item = items.body.data[0]
  await request(app).delete(`/api/items/${item.id}`)
  
  const itemsAfterDelete = await request(app).get('/api/items')
  const result = itemsAfterDelete.body.data.find((itemAfterDelete: Item) => itemAfterDelete.id === item.id)
  expect(result).toBeUndefined()
})

test('PATCH /api/items/:id', async () => {
  const items = await request(app).get('/api/items')
  const item = items.body.data[0]
  const updatedItem = {
    quantity: 6
  }

  const response = await request(app).patch(`/api/items/${item.id}`).send(updatedItem)
  expect(response.body.data.quantity).toBe(6)
})
