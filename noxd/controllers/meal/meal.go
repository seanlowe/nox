package meal

import (
  "encoding/json"
  "fmt"
  "net/http"
)

func GetQueryParameter(r *http.Request, key string) (string) {
  query := r.URL.Query()
  return query.Get(key)
}

func CreateMealWeek(w http.ResponseWriter, r *http.Request) {
  CreateWeek(w, r)
  w.WriteHeader(http.StatusCreated)
  w.Write([]byte("success"))
}

func GetFromSlug(w http.ResponseWriter, r *http.Request) {
  typeParam := GetQueryParameter(r, "type")
  fmt.Println("typeParam", typeParam)
  meals := GetMeals(typeParam)
  result, _ := json.Marshal(meals)

  w.WriteHeader(http.StatusOK)
  w.Write([]byte(result))
}

func GetMealWeek(w http.ResponseWriter, r *http.Request) {
  mealWeek := GetWeek()
  result, _ := json.Marshal(mealWeek)

  w.WriteHeader(http.StatusOK)
  w.Write([]byte(result))
}
