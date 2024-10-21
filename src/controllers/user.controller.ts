import { IncomingMessage, ServerResponse } from "node:http"

import { User } from "src/types/user.types"
import { create, findAll, findById, remove, update } from "../models/user.model"
import { createErrorResponse } from "../utils/errorResponse.utils"
import { getPostData } from "../utils/getPostData.utils"
import { sendResponse } from "../utils/sendResponse.utils"

async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await findAll()

    sendResponse(res, 200, users)
  } catch (error) {
    console.error(error)
    sendResponse(res, 500, createErrorResponse(500, "Internal server error"))
  }
}

async function getUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await findById(id)

    if (!user) {
      sendResponse(res, 404, createErrorResponse(404, "User Not Found"))
    } else {
      return sendResponse(res, 200, user)
    }
  } catch (error) {
    console.error(error)
    sendResponse(res, 500, createErrorResponse(500, "Internal server error"))
  }
}

async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req)

    const { username, age, hobbies } = JSON.parse(body)

    const user = {
      username,
      age,
      hobbies,
    }

    if (!username || !age || !Array.isArray(hobbies)) {
      return sendResponse(
        res,
        400,
        createErrorResponse(400, "Invalid request body: username, age, and hobbies are required")
      )
    }

    const newUser = await create(user)

    return sendResponse(res, 201, newUser)
  } catch (error) {
    console.error(error)
    sendResponse(res, 500, createErrorResponse(500, "Internal server error"))
  }
}

async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await findById(id)

    if (!user) {
      sendResponse(res, 404, createErrorResponse(404, "User Not Found"))
    } else {
      const body = await getPostData(req)

      const { username, age, hobbies } = JSON.parse(body)

      const userData: Omit<User, "id"> = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }

      const updUser = await update(id, userData)

      return sendResponse(res, 200, updUser)
    }
  } catch (error) {
    console.error(error)
    sendResponse(res, 500, createErrorResponse(500, "Internal server error"))
  }
}

async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const user = await findById(id)

    if (!user) {
      sendResponse(res, 404, createErrorResponse(404, "User Not Found"))
    } else {
      await remove(id)
      sendResponse(res, 200, { message: `User ${id} removed` })
    }
  } catch (error) {
    console.error(error)
    sendResponse(res, 500, createErrorResponse(500, "Internal server error"))
  }
}

export { createUser, deleteUser, getUser, getUsers, updateUser }
