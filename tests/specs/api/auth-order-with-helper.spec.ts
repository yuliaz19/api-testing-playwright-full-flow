import { test, expect } from '@playwright/test'
import {
  fetchJwt,
  createOrder,
  getOrderById,
  deleteOrder,
  getDeletedOrderById,
  getAllOrders,
  fetchJwtCourier,
  assignOrder,
  statusOrder,
} from '../../helpers/api-helper'
import { StatusDto } from '../../dto/status-dto'
import { OrderDto } from '../../dto/order-dto'

let jwt: string
let jwtC: string

test.beforeAll(async ({ request }) => {
  jwt = await fetchJwt(request)
  jwtC = await fetchJwtCourier(request)
})

test('login and create order with api-helper', async ({ request }) => {
  const orderId = await createOrder(request, jwt)
  expect.soft(orderId).toBeGreaterThan(0)
})

test('create order and find order by id', async ({ request }) => {
  const orderId = await createOrder(request, jwt)
  expect.soft(orderId).toBeGreaterThan(0)
  const order: OrderDto = await getOrderById(request, jwt, orderId)
  expect.soft(order.id).toBe(orderId)
  expect.soft(order.status).toBe(StatusDto.OPEN)
})

test('create order and delete order by id and check deletion', async ({ request }) => {
  const orderId = await createOrder(request, jwt)
  console.log(orderId)
  await deleteOrder(request, jwt, orderId)
  await getDeletedOrderById(request, jwt, orderId)
})

test('create two orders and find all orders', async ({ request }) => {
  const orderId1 = await createOrder(request, jwt)
  expect.soft(orderId1).toBeGreaterThan(0)
  const orderId2 = await createOrder(request, jwt)
  expect.soft(orderId2).toBeGreaterThan(0)
  const allOrders = await getAllOrders(request, jwt)
  expect.soft(Array.isArray(allOrders)).toBeTruthy()
  console.log(allOrders)
  const lastOrder = allOrders[allOrders.length - 1] // as there is a lot of orders check the last two created
  expect.soft(lastOrder.id).toBe(orderId2)
  console.log(lastOrder.id)
  const preLastOrder = allOrders[allOrders.length - 2]
  console.log(preLastOrder.id)
  expect.soft(preLastOrder.id).toBe(orderId1)
})

test('create order + assign it for courier + change status', async ({ request }) => {
  const orderId = await createOrder(request, jwt)
  const assOrder: OrderDto = await assignOrder(request, jwtC, orderId)
  const courierId = 2818
  expect.soft(assOrder.id).toBe(orderId)
  expect.soft(assOrder.courierId).toBe(courierId)
  const changedOrder: OrderDto = await statusOrder(request, jwtC, orderId, StatusDto.DELIVERED)
  console.log(changedOrder)
  expect.soft(changedOrder.id).toBe(orderId)
  expect.soft(changedOrder.courierId).toBe(courierId)
})
