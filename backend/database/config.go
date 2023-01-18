package database

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (s *MongoDBRepository) EnsureSchema() (err error) {
	ctx := context.Background()

	err = s.db.CreateCollection(ctx, COLLECTION_CLIENT)

	err = s.db.CreateCollection(ctx, COLLECTION_USER)

	usernameIndex := mongo.IndexModel{
		Keys:    bson.M{"username": 1},
		Options: options.Index().SetUnique(true),
	}
	idxName, err := s.db.Collection(COLLECTION_USER).
		Indexes().
		CreateOne(ctx, usernameIndex)

	if err != nil {
		return
	}

	fmt.Println("Index created: " + idxName)
	return
}
