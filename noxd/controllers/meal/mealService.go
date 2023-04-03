package meal

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
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

func CreateWeek(w http.ResponseWriter, r *http.Request) (error) {
  fmt.Println("in createWeek")

  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Failed to read request body", http.StatusInternalServerError)
    return nil
  }
  defer r.Body.Close()

  fmt.Printf("%v", body)

  return nil
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
  var meals []Meal
  var db = globals.DbConn
  globals.IsDbConnectionValid(db)
  
  fmt.Printf("getMealsByMealtime mealtime %s\n", mealtime)

  res := db.SQL().SelectFrom("Meal")
  err := res.Where("type = ?", mealtime).All(&meals)
  
  // cond := db.Cond("type": mealtime)
  // mealCollection := db.Collection("Meal")
  // err := mealCollection.Find(cond).All(&meals)
  if err != nil {
    log.Fatal("Where: ", err)
  }

  fmt.Printf("getMealsByMealTime -> %v\n", meals)

  return &meals
}

func GetMeals(mealtime string) (*[]Meal) {
  if (!helpers.Contains(MEAL_TIMES, mealtime)) {
    fmt.Println("unknown query parameter")
    return nil
  }

  return getMealsByMealtime(mealtime)
}
