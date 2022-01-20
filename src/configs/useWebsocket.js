import { WS_ADDRESS } from './address.js'
export function useWebsocket () {
  const ws = new WebSocket(WS_ADDRESS)
  return ws
}
