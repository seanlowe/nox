package service

import (
    "fmt"
	"encoding/json"
    "io/ioutil"
    "net/http"
    "net/url"
	"os"

	"github.com/joho/godotenv"
)

func get(url string, client *http.Client) (string, error) {
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

func FetchWeather() {
	var client = &http.Client{}

	addr, err := get( "https://api.ipify.org/", client )
	if err != nil {
        fmt.Println("no ip addr ")
        return
    }

	newAddr := fmt.Sprintf("http://ip-api.com/json/%s", addr)
	coords, err := get( newAddr, client )
	if err != nil {
        fmt.Println("no ip addr ")
        return
    }

	type Coordinates struct {
		Lat float64 `json:lat`
		Lon float64 `json:lon`
	}

	var c Coordinates
	err = json.Unmarshal([]byte(coords), &c)
	if err != nil {
		panic(err)
	}
	
	err = godotenv.Load(".env")
	WEATHER_URL := os.Getenv("WEATHER_URL")
    WEATHER_API_KEY := os.Getenv("WEATHER_API_KEY")
	
	params := url.Values{}
	params.Add("lat", fmt.Sprintf("%f", c.Lat))
	params.Add("lon", fmt.Sprintf("%f", c.Lon))
	params.Add("units", "imperial")
	params.Add("appid", WEATHER_API_KEY)
	rawQuery := params.Encode()
	weatherUrl := fmt.Sprintf("%s?%s", WEATHER_URL, rawQuery)

	fmt.Println(weatherUrl)

	weather, err := get( weatherUrl, client )
	if err != nil {
        fmt.Println("no weather")
        return
    }

	fmt.Println(weather)
}
