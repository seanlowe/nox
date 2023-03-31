package weather

type Coordinates struct {
  Lat float64 `json:"lat"`
  Lon float64 `json:"lon"`
}

type GeocodingResponse struct {
  Lat float64 `json:"lat"`
  Lon float64 `json:"lon"`
  Name string `json:"name"`
  Country string `json:"country"`
  State string `json:"state"`
}
