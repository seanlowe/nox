package status

type Server struct {
  ID int32 `db:"id,omitempty"`
  Name string `db:"name", json:"name"` 
  Host string `db:"host", json:"host"`
  Port string `db:"port", json:"port"`
}

type ServerStatus struct {
  ONLINE string
  OFFLINE string
  LOADING string
}

var ServerStatuses = ServerStatus{
  ONLINE: "Running",
  OFFLINE: "Stopped",
  LOADING: "Loading",
}
