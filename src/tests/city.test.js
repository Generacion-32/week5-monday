const request = require('supertest')
const app = require('../app')
const City = require('../models/City')

const BASE_URL = '/cities'

beforeAll(async () => {
  return await City.bulkCreate(
    [
      {
        name: "Valencia",
        country: "Venezuela",
        isCapital: false
      },
      {
        name: "Narino",
        country: "Colombia",
        isCapital: false
      },
      {
        name: "Malambo",
        country: "Colombia",
        isCapital: false
      },
    ]
  )
})

const newBody = {
  name: "Cordoba",
  country: "Arg",
  isCapital: false
}

let cityId //declaracion 

//getAll
test("Get '/cities' should return statusCode 200", async () => {
  const res = await request(app)
    .get(BASE_URL)

  //console.log(res.body);
  expect(res.status).toBe(200)
  //expect(res.body.length).toBe(0)
  expect(res.body).toHaveLength(3)
})

//create
test("Post '/cities' should return statusCode 201, and res.body.name = newBody.name", async () => {

  const res = await request(app)
    .post(BASE_URL)
    .send(newBody)

  cityId = res.body.id


  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(newBody.name)
})

//getOne
test("Get '/cities/:id', should return 200, res.body to be defined and res.body.name = newBody.name ", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${cityId}`) //http://localhost:8080/cities/4

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(newBody.name)

})

//update
test("Put '/cities/:id', should return 200, res.body to be defined and res.body.name = 'Bogota'", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${cityId}`)
    .send({ name: "Bogota" })

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe("Bogota")
})

//delete
test("Delete '/cities/:id', should return 204", async () => {

  const res = await request(app)
    .delete(`${BASE_URL}/${cityId}`)

  expect(res.statusCode).toBe(204)
})