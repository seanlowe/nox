package meal

type Meal struct {
  ID int32 `db:"id,omitempty"`
  Name string `db:"name"`
  Type string `db:"type"`
  LastMade time.Time `db:"lastMade"`
}
