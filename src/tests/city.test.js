const request = require('supertest')
const app = require('../app')

const BASE_URL = '/cities'

test("Get '/cities' should return statusCode 200", async () => {
  const res = await request(app)
    .get(BASE_URL)

  //console.log(res.body);
  expect(res.status).toBe(200)
  //expect(res.body.length).toBe(0)
  expect(res.body).toHaveLength(3)
})


test("Post '/cities' should return statusCode 201", async () => {
  const newBody = {
    name: "Cordoba",
    country: "Arg",
    isCapital: false
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(newBody)

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(newBody.name)
})
