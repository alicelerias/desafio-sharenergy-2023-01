package database

import (
	"context"

	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"go.mongodb.org/mongo-driver/bson"
)

const COLLECTION_USER = "user"

func GetUser(ctx context.Context, username string) (user *models.User, err error) {
	db := GetConnection()
	err = db.Collection(COLLECTION_USER).
		FindOne(ctx, bson.M{
			"username": username,
		}, nil).
		Decode(&user)

	return
}

func CreateUser(ctx context.Context, user *models.User) (err error) {
	db := GetConnection()
	_, err = db.Collection(COLLECTION_USER).
		InsertOne(ctx, user)
	return
}
