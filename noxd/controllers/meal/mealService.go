package meal

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
  "os"

  "noxd/globals"
  "noxd/helpers"
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
  body, err := ioutil.ReadAll(r.Body)
  if err != nil {
    http.Error(w, "Failed to read request body", http.StatusInternalServerError)
    return err
  }
  defer r.Body.Close()

  var data map[string]interface{}
  err = json.Unmarshal([]byte(body), &data)
  if err != nil {
    log.Fatal("unmarshal: ", err)
    return err
  }

  postBody := data["data"].(string)

  helpers.CreateOrUpdateFile(FREYR_WEEK_LOG, []byte(postBody))

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
