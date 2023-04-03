package meal

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "os"

  "nox/noxd/globals"
  "nox/noxd/helpers"
)

var FREYR_WEEK_LOG string = "./storage/freyr/week.json"

func checkFileExistsAndRead(filename string) ([]byte, error) {
  _, err := os.Stat(filename)
  if os.IsNotExist(err) {
    return nil, fmt.Errorf("File does not exist: %s", filename)
  }

  if err != nil {
    return nil, fmt.Errorf("Error while checking file: %v", err)
  }

  data, err := ioutil.ReadFile(filename)
  if err != nil {
    return nil, fmt.Errorf("Error while reading file: %v", err)
  }

  return data, nil
}

func GetWeek() (*[]MealWeek) {
  weekFile, err := checkFileExistsAndRead(FREYR_WEEK_LOG)
  if weekFile == nil || err != nil {
    return nil
  }

  var mealWeek []MealWeek
  err = json.Unmarshal(weekFile, &mealWeek)
  if err != nil {
    log.Fatal(err)
  }

  return &mealWeek
}

func getMealsByMealtime(mealtime string) (*[]Meal) {
  var db = globals.DbConn
  var meals []Meal
  
  globals.IsDbConnectionValid(db)

  res := db.SQL().SelectFrom("Meal")
  err := res.Where("type = ?", mealtime).All(&meals)
  if err != nil {
    log.Fatal("Where: ", err)
  }

  return &meals
}

func GetMeals(mealtime string) (*[]Meal) {
  if (!helpers.Contains(MEAL_TIMES, mealtime)) {
    fmt.Println("unknown query parameter")
    return nil
  }

  return getMealsByMealtime(mealtime)
}
