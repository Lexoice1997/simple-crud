import { config } from "dotenv"
import { IncomingMessage, ServerResponse, createServer } from "http"
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./controllers/user.controller"

config()
const PORT = process.env.PORT || 5000

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3]
    getUser(req, res, id)
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3]
    updateUser(req, res, id)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3]
    deleteUser(req, res, id)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(
      JSON.stringify({
        message: "Route Not Found: Please use the api/users endpoint",
      })
    )
  }
}

export const server = createServer(requestHandler)

server.listen(PORT, () => console.log("Server started on PORT " + PORT))
