process.env.NODE_ENV = "test"
import { default as chai, default as should } from "chai"
import chaiHttp from "chai-http"
import { server } from "../src/server.ts"

chai.use(chaiHttp)
describe("Users", () => {
  const id = "3",
    numProducts = 5,
    successCode = 200,
    product = {
      username: "Azamat",
      age: 15,
      hobbies: ["asd"],
    },
    testName = "Azamat Berdimuratov",
    testPrice = { title: "hello", age: 15 }

  describe("/GET user", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(numProducts)
          done()
        })
    })
  })

  describe("/POST user", () => {
    it("it should POST a user ", (done) => {
      chai
        .request(server)
        .post("/api/users")
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("username")
          res.body.should.have.property("age")
          res.body.should.have.property("hobbies")
          res.body.should.have.property("id")
          done()
        })
    })
  })

  describe("/GET/:id user", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("id").eql(id)
          res.body.should.have.property("age")
          res.body.should.have.property("hobbies")
          res.body.should.have.property("username").eql(testName)
          done()
        })
    })
  })

  describe("/PUT/:id product", () => {
    it("it should UPDATE a product given the id", (done) => {
      chai
        .request(server)
        .put(`/api/users/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("id").eql(id)
          res.body.should.have.property("username").eql(testName)
          res.body.should.have.property("hobbies")
          res.body.should.have.property("age").eql(testPrice.age)
          done()
        })
    })
  })

  describe("/DELETE/:id user", () => {
    it("it should DELETE a user given the id", (done) => {
      chai
        .request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("message").eql(`User ${id} removed`)
          done()
        })
    })
  })
})
