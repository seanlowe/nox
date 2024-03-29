package helpers

import (
  "fmt"
  "net/http"
  "io/ioutil"
  "os"
)

func Get(url string, client *http.Client) (string, error) {
  request, err := http.NewRequest("GET", url, nil)
  if err != nil {
    fmt.Println("Error creating request:", err)
    return "", err
  }

  response, err := client.Do(request)
  if err != nil {
    fmt.Println("Error sending request:", err)
    return "", err
  }

  body, err := ioutil.ReadAll(response.Body)
  if err != nil {
    fmt.Println("Error reading response body:", err)
    return "", err
  }

  defer response.Body.Close()

  return string(body), nil
}

func Contains[T comparable](s []T, e T) bool {
  for _, v := range s {
    if v == e {
      return true
    }
  }

  return false
}

func CreateOrUpdateFile(filename string, content []byte) error {
  file, err := os.Create(filename)
  if err != nil {
    return fmt.Errorf("error creating file: %v", err)
  }
  defer file.Close()

  _, err = file.Write(content)
  if err != nil {
    return fmt.Errorf("error writing to file: %v", err)
  }

  return nil
}
