package status

import (
  "fmt"
  "net"
  "time"
  "os"
)

func retrieveConnectionDetailsFromServerName(server string) (string, string) {

  // use the HA env values for now
  HA_IP_ADDRESS := os.Getenv("HA_IP_ADDRESS")
  HA_PORT := os.Getenv("HA_PORT")

  return HA_IP_ADDRESS, HA_PORT
}

func GetServerStatus(server string) {
  host, port := retrieveConnectionDetailsFromServerName(server)
  timeout := time.Second * 5

  conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), timeout)
  if err != nil {
    fmt.Println("Server is not running:", err)
    return
  }

  conn.Close()
  fmt.Println("Server is running at", net.JoinHostPort(host, port))
}
