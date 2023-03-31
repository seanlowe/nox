package status

import (
  "fmt"
  "log"
  "net"
  "net/http"
  "time"

  "nox/noxd/globals"
)

func Insert(newServer Server) {
  fmt.Println("not implemented yet")
}

// get an individual server's details based on its name
func retrieveConnectionDetailsFromServerName(serverName string, r *http.Request) (string, string) {
  var db = globals.DbConn
  var foundServer Server

  if (db == nil) {
    log.Fatal("db is nil")
  }

  res := db.SQL().SelectFrom("Server")
  err := res.Where("name = ?", serverName).One(&foundServer)
  if err != nil {
    log.Fatal("Where: ", err)
  }

  return foundServer.Host, foundServer.Port
}

// get if a server is running
func GetServerStatus(server string, r *http.Request) (s string) {
  host, port := retrieveConnectionDetailsFromServerName(server, r)
  timeout := time.Second * 5

  conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), timeout)
  if err != nil {
    fmt.Println("Server is not running:", err)
    return ServerStatuses.OFFLINE
  }

  conn.Close()
  return ServerStatuses.ONLINE
}

// get a list of all servers
func GetAllServers() ([]Server) {
  var db = globals.DbConn
  var serverList []Server

  if (db == nil) {
    log.Fatal("db is nil")
  }

  err := db.SQL().SelectFrom("Server").All(&serverList)
  if err != nil {
    log.Fatal("All: ", err)
  }

  return serverList
}
