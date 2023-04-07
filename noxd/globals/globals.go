package globals

import (
  "log"

	"github.com/upper/db/v4"
)

var DbConn db.Session

func IsDbConnectionValid(conn db.Session) {
  if conn == nil {
    log.Fatal("The DB connection is invalid or broken.")
    panic("No DB connection.")
  }
}
