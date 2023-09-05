package routes

import (
	"api/controller"
	"net/http"
)

// cardsRoutes defines a slice of Route objects representing the routes for password cards.
var cardsRoutes = []Route{
	{
		URI:      "/password-cards",
		Method:   http.MethodGet,
		Function: controller.GetAllCards,
	},
	{
		URI:      "/password-cards",
		Method:   http.MethodPost,
		Function: controller.AddCard,
	},
	{
		URI:      "/password-cards/{id}",
		Method:   http.MethodPut,
		Function: controller.UpdateCard,
	},
	{
		URI:      "/password-cards/{id}",
		Method:   http.MethodDelete,
		Function: controller.DeleteCard,
	},
}
