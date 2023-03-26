package status

import (
  "fmt"
  "net"
  "time"
  "log"
  "os"
  "net/http"

  "github.com/upper/db/v4/adapter/postgresql"
)

type Server struct {
  ID int32 `db:"id,omitempty"`
  Name string `db:"name"`
  IPv4 string `db:"ipv4"`
  Port string `db:"port"`
}

type Meal struct {
  ID int32 `db:"id,omitempty"`
  Name string `db:"name"`
  Type string `db:"type"`
  LastMade time.Time `db:"lastMade"`
}

func retrieveConnectionDetailsFromServerName(serverName string, r *http.Request) (string, string) {
  // DATABASE_URL := "postgresql://postgres:password@localhost:5432/nox_data?sslmode=disable"
  
  DB_NAME := os.Getenv("DB_NAME")
  DB_HOST := os.Getenv("DB_HOST")
  DB_USER := os.Getenv("DB_USER")
  DB_PW := os.Getenv("DB_PW")

  sess, err := postgresql.Open(postgresql.ConnectionURL{
    Database: DB_NAME,
    Host:     DB_HOST,
    User:     DB_USER,
    Password: DB_PW,
  })

  if err != nil {
    log.Fatal("Open: ", err)
  }

  defer sess.Close()

  var foundServer Server
  res := sess.SQL().SelectFrom("Server")
  err = res.Where(fmt.Sprintf("name = '%s'", serverName)).One(&foundServer)

  fmt.Printf("servers name cond: %#v\n", foundServer)

  // ^^^^ new upper/db stuff

  // use the HA env values for now
  HA_IP_ADDRESS := os.Getenv("HA_IP_ADDRESS")
  HA_PORT := os.Getenv("HA_PORT")
  return HA_IP_ADDRESS, HA_PORT
}

func GetServerStatus(server string, r *http.Request) {
  host, port := retrieveConnectionDetailsFromServerName(server, r)
  timeout := time.Second * 5

  conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), timeout)
  if err != nil {
    fmt.Println("Server is not running:", err)
    return
  }

  conn.Close()
  fmt.Println("Server is running at", net.JoinHostPort(host, port))
}
