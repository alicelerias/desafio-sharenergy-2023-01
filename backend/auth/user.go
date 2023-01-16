package auth

import (
	"context"
	"crypto/rand"
	"fmt"
	"time"

	"github.com/alicelerias/desafio-sharenergy-2023-01/database"
	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"github.com/alicelerias/desafio-sharenergy-2023-01/types"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(ctx context.Context, user *types.User) error {
	return database.CreateUser(ctx, userToModel(user))
}

func saltPassword(salt []byte, password string) []byte {
	return append(salt, []byte(password)...)
}

func hashPassword(password string) (hash, salt []byte) {
	salt = make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		panic(err)
	}

	saltedPassword := saltPassword(salt, password)
	hashedPassword, err := bcrypt.GenerateFromPassword(saltedPassword, 10)
	if err != nil {
		panic(err)
	}

	return hashedPassword, salt
}

func userToModel(user *types.User) *models.User {
	fmt.Println(user)
	hash, salt := hashPassword(user.Login.Password)
	return &models.User{
		ID:           primitive.NewObjectID(),
		Username:     user.Login.UserName,
		PasswordHash: hash,
		Salt:         salt,
		Disabled:     false,
		CreatedAt:    time.Now(),
		UpdateAt:     time.Now(),
	}
}
