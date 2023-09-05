package main

import (
	"api/router"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

func main() {
	r := router.GenerateRouter()
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut}),
		handlers.AllowedHeaders([]string{"X-Request-With", "Content-Type", "Autorization"}),
	)(r)))

}
