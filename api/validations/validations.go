package validations

import (
	"api/model"

	"github.com/go-playground/validator/v10"
)

// CardValidation performs data validation on a model.Card struct using the validator package
// and returns the first validation error encountered, if any.
func CardValidation(data model.Card) validator.FieldError {

	v := validator.New()

	err := v.Struct(data)

	if err != nil {
		for _, e := range err.(validator.ValidationErrors) {
			return e
		}
	}

	return nil

}
