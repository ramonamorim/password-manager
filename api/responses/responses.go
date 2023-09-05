package responses

import (
	"encoding/json"
	"net/http"
)

// ErrorResponse represents a JSON response containing an error message.
type ErrorResponse struct {
	Error string `json:"error"`
}

// JsonResponse sends a JSON response with the specified status code and data.
func JsonResponse(w http.ResponseWriter, statusCode int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(data)
}

// JsonErrorResponse sends a JSON response with an error message and the specified status code.
func JsonErrorResponse(w http.ResponseWriter, statusCode int, err error) {
	errorResp := ErrorResponse{Error: err.Error()}
	JsonResponse(w, statusCode, errorResp)
}

// JsonValidationErrorResponse sends a JSON response with a validation error message and the specified status code.
func JsonValidationErrorResponse(w http.ResponseWriter, statusCode int, fieldErr string) {
	JsonResponse(w, statusCode, fieldErr+" is required")
}
