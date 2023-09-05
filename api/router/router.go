package router

import (
	"api/router/routes"

	"github.com/gorilla/mux"
)

// GenerateRouter creates and configures a mux.Router with the defined routes.
func GenerateRouter() *mux.Router {
	r := mux.NewRouter()
	return routes.Configure(r)
}
