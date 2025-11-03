import { expect, test } from '@playwright/test'
import {
  assignOrder,
  createOrder,
  fetchJwt,
  fetchJwtCourier,
  getOrderById,
  statusOrder,
} from '../../helpers/api-helper'
import { OrderDto } from '../../dto/order-dto'
import { StatusDto } from '../../dto/status-dto'

let jwt: string

test.beforeAll(async ({ request }) => {
  jwt = await fetchJwtCourier(request)
})

test('assign order by id for courier', async ({ request }) => {
  const assOrder: OrderDto = await assignOrder(request, jwt, 12380)
  //console.log(assOrder)
  expect.soft(assOrder.id).toBe(12380)
  expect.soft(assOrder.courierId).toBe(2818)
})

test('change order status by id for courier', async ({ request }) => {
  const changedOrder: OrderDto = await statusOrder(request, jwt, 12380, 'DELIVERED')
  console.log(changedOrder)
  expect.soft(changedOrder.id).toBe(12380)
  expect.soft(changedOrder.courierId).toBe(2818)
})
