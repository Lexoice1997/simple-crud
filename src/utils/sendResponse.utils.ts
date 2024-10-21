import { ServerResponse } from "node:http"

export const sendResponse = (res: ServerResponse, status: number, data: unknown): void => {
  res.writeHead(status, { "Content-Type": "application/json" })
  res.end(JSON.stringify(data))
}
