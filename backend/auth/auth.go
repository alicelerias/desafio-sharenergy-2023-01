package auth

import (
	"context"
	"time"

	"github.com/alicelerias/desafio-sharenergy-2023-01/database"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"golang.org/x/crypto/bcrypt"
)

type Tokens struct {
	AccessToken string `json:"access_token"`
}

func Authenticate(ctx context.Context, repository database.Repository, creds *types.Credential) (tokens *Tokens, err error) {
	tokens = &Tokens{}
	user, err := repository.GetUser(ctx, creds.Username)
	if err != nil {
		return
	}

	if !passwordMatch(user.PasswordHash, user.Salt, creds.Password) {
		return nil, NewPasswordDoesntMatchError()
	}

	duration := time.Hour
	if creds.RememberMe {
		duration = time.Hour * 24 * 31 // um mes
	}
	expiration := time.Now().Add(duration).Unix()
	tokens.AccessToken, err = GetSignedToken(user.ID.String(), user.Username, expiration)
	return
}

func passwordMatch(passwordHash []byte, salt []byte, password string) bool {
	saltedPassword := saltPassword(salt, password)
	err := bcrypt.CompareHashAndPassword(passwordHash, saltedPassword)
	return err == nil
}
