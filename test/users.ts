process.env.NODE_ENV = "test"
import { default as chai, default as should } from "chai"
import chaiHttp from "chai-http"
import { server } from "../src/server.ts"

chai.use(chaiHttp)
describe("Products", () => {
  // Consts
  const id = "3",
    numProducts = 5,
    successCode = 200,
    product = {
      name: "hello",
      description: "hello",
      price: "1170",
    },
    testName = "Cannon EOS 80D DSLR Camera",
    testPrice = { title: "hello", price: "778" }

  describe("/GET product", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("array")
          res.body.length.should.be.eql(numProducts)
          done()
        })
    })
  })

  describe("/POST product", () => {
    it("it should POST a product ", (done) => {
      chai
        .request(server)
        .post("/api/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          res.body.should.have.property("name")
          res.body.should.have.property("description")
          res.body.should.have.property("price")
          res.body.should.have.property("id")
          done()
        })
    })
  })

  describe("/GET/:id product", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(server)
        .get(`/api/products/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("id").eql(id)
          res.body.should.have.property("description")
          res.body.should.have.property("price")
          res.body.should.have.property("name").eql(testName)
          done()
        })
    })
  })

  describe("/PUT/:id product", () => {
    it("it should UPDATE a product given the id", (done) => {
      chai
        .request(server)
        .put(`/api/products/${id}`)
        .send(testPrice)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("id").eql(id)
          res.body.should.have.property("name").eql(testName)
          res.body.should.have.property("description")
          res.body.should.have.property("price").eql(testPrice.price)
          done()
        })
    })
  })

  describe("/DELETE/:id product", () => {
    it("it should DELETE a product given the id", (done) => {
      chai
        .request(server)
        .delete(`/api/products/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode)
          res.body.should.be.a("object")
          res.body.should.have.property("message").eql(`Product ${id} removed`)
          done()
        })
    })
  })
})
