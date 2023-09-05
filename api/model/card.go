package model

import (
	"strings"
)

// Card represents a data structure for card information.
type Card struct {
	ID       uint64 `json:"id,omitempty"`
	Url      string `json:"url,omitempty" validate:"required"`
	Name     string `json:"name,omitempty" validate:"required"`
	Username string `json:"username,omitempty" validate:"required"`
	Password string `json:"password,omitempty" validate:"required"`
}

// Format formats the card data by trimming leading and trailing spaces.
func Format(card *Card) {
	card.Url = strings.TrimSpace(card.Url)
	card.Name = strings.TrimSpace(card.Name)
	card.Username = strings.TrimSpace(card.Username)
}
