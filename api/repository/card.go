package repository

import (
	"api/model"
	"errors"
	"sort"
	"strings"
)

// CardRepository represents a repository for managing card data.
type CardRepository struct {
	cards  map[uint64]model.Card
	nextID uint64
}

var (
	GlobalCardRepo = NewCardRepository()
)

// NewCardRepository creates a new CardRepository instance.
func NewCardRepository() *CardRepository {
	return &CardRepository{
		cards:  make(map[uint64]model.Card),
		nextID: 1,
	}
}

// AddCard adds a card to the repository and returns the added card.
func (r *CardRepository) AddCard(card model.Card) model.Card {

	card.ID = r.nextID
	r.cards[r.nextID] = card
	r.nextID++

	return card
}

// GetAllCards retrieves all cards from the repository, optionally filtered by name.
func (r *CardRepository) GetAllCards(nameFilter string) []model.Card {

	cardsList := make([]model.Card, 0, len(r.cards))

	for _, card := range r.cards {
		if nameFilter != "" {
			if strings.Contains(card.Name, nameFilter) {
				cardsList = append(cardsList, card)
			}
		} else {
			cardsList = append(cardsList, card)
		}
	}
	compareByID := func(i, j int) bool {
		return cardsList[i].ID < cardsList[j].ID
	}
	sort.Slice(cardsList, func(i, j int) bool {
		return compareByID(i, j)
	})
	return cardsList
}

// DeleteCard deletes a card with the specified ID from the repository.
func (r *CardRepository) DeleteCard(cardID uint64) (bool, error) {

	_, ok := r.cards[cardID]
	if !ok {
		err := errors.New("card not found")
		return false, err
	}

	delete(r.cards, cardID)
	return true, nil
}

// UpdateCard updates a card's information in the repository with the specified card ID.
func (r *CardRepository) UpdateCard(cardID uint64, cardToUpdate model.Card) (model.Card, error) {

	_, ok := r.cards[cardID]
	if !ok {
		err := errors.New("card not found")
		return model.Card{}, err
	}
	var updatedCard model.Card
	cardToUpdate.ID = cardID

	r.cards[cardID] = cardToUpdate

	updatedCard = r.cards[cardID]
	return updatedCard, nil
}
