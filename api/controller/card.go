package controller

import (
	"api/model"
	"api/repository"
	"api/responses"
	"api/validations"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// AddCard adds a new card to the collection.
func AddCard(w http.ResponseWriter, r *http.Request) {
	var card model.Card
	json.NewDecoder(r.Body).Decode(&card)
	validationsError := validations.CardValidation(card)
	if validationsError != nil {
		responses.JsonValidationErrorResponse(w, http.StatusBadRequest, validationsError.Field())
		return
	}
	model.Format(&card)
	cardPersisted := repository.GlobalCardRepo.AddCard(card)
	responses.JsonResponse(w, http.StatusCreated, cardPersisted)
}

// GetAllCards retrieves all cards, optionally filtered by name.
func GetAllCards(w http.ResponseWriter, r *http.Request) {
	nameFilter := r.URL.Query().Get("name")

	cards := repository.GlobalCardRepo.GetAllCards(nameFilter)
	responses.JsonResponse(w, http.StatusOK, cards)
}

// UpdateCard updates the information of an existing card.
func UpdateCard(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	cardIDStr := params["id"]
	cardID, err := strconv.ParseUint(cardIDStr, 10, 64)
	if err != nil {
		responses.JsonErrorResponse(w, http.StatusBadRequest, err)
		return
	}
	var updatedCard model.Card
	json.NewDecoder(r.Body).Decode(&updatedCard)
	validationsError := validations.CardValidation(updatedCard)
	if validationsError != nil {
		responses.JsonValidationErrorResponse(w, http.StatusBadRequest, validationsError.Field())
		return
	}
	model.Format(&updatedCard)
	cardPersisted, err := repository.GlobalCardRepo.UpdateCard(cardID, updatedCard)
	if err != nil {
		responses.JsonErrorResponse(w, http.StatusNotFound, err)
		return
	}
	responses.JsonResponse(w, http.StatusOK, cardPersisted)
}

// DeleteCard deletes a card with the specified ID.
func DeleteCard(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	cardIDStr := params["id"]
	cardID, err := strconv.ParseUint(cardIDStr, 10, 64)
	if err != nil {
		responses.JsonErrorResponse(w, http.StatusBadRequest, err)
		return
	}
	success, err := repository.GlobalCardRepo.DeleteCard(cardID)
	if !success {
		responses.JsonErrorResponse(w, http.StatusNotFound, err)
		return
	}
	responses.JsonResponse(w, http.StatusAccepted, "deleted")
}
