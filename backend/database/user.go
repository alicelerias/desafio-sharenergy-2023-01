package database

import (
	"context"

	"github.com/alicelerias/desafio-sharenergy-2023-01/models"
	"go.mongodb.org/mongo-driver/bson"
)

const COLLECTION_USER = "user"

func (s *MongoDBRepository) GetUser(ctx context.Context, username string) (user *models.User, err error) {
	err = s.db.Collection(COLLECTION_USER).
		FindOne(ctx, bson.M{
			"username": username,
		}, nil).
		Decode(&user)

	return
}

func (s *MongoDBRepository) CreateUser(ctx context.Context, user *models.User) (err error) {
	_, err = s.db.Collection(COLLECTION_USER).
		InsertOne(ctx, user)
	return
}
