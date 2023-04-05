package meal

import (
  "time"
)

var MEAL_TIMES = []string{"breakfast", "lunch", "dinner"}

type MealWeek struct {
  Day string `json:"day"`
  Lunch Meal `json:"lunch"`
  Dinner Meal `json:"dinner"`
}

type Meal struct {
  Id int32 `db:"id,omitempty" json:"id"`
  Name string `db:"name" json:"name"`
  Type string `db:"type" json:"type"`
  LastMade time.Time `db:"lastMade" json:"lastMade"`
}
