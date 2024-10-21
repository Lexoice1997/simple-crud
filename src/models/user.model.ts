import { v4 as uuidv4 } from "uuid"

import { User } from "../types/user.types"

const users: User[] = []

function findAll(): Promise<User[]> {
  return new Promise((resolve) => {
    resolve(users)
  })
}

function findById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    const user = users.find((p) => p.id === id)
    resolve(user)
  })
}

function create(product: Omit<User, "id">): Promise<User> {
  return new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...product }
    users.push(newUser)

    resolve(newUser)
  })
}

function update(id: string, product: Omit<User, "id">): Promise<User> {
  return new Promise((resolve) => {
    const index = users.findIndex((p) => p.id === id)

    users[index] = { ...users[index], ...product }

    resolve(users[index])
  })
}

function remove(id: string): Promise<true> {
  return new Promise((resolve) => {
    const index = users.findIndex((p) => p.id !== id)

    users.slice(index, 1)

    resolve(true)
  })
}

export { create, findAll, findById, remove, update }
