package hello

import (
	"fmt"
	"net/http"
)

func Get(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hi"))
	fmt.Printf("Hello!\n")
}
