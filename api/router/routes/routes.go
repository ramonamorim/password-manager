package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

// Route represents the URI, HTTP method, and corresponding handler function for a route.
type Route struct {
	URI      string
	Method   string
	Function func(http.ResponseWriter, *http.Request)
}

// Configure configure all routes
func Configure(r *mux.Router) *mux.Router {
	routes := cardsRoutes

	for _, route := range routes {
		r.HandleFunc(route.URI, route.Function).Methods(route.Method)
	}

	return r
}
