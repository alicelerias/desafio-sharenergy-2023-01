package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `bson:"_id"`
	Username       string             `bson:"username"`
	PasswordHash   []byte             `bson:"pwd_hash"`
	Salt           []byte             `bson:"salt"`
	Disabled       bool               `bson:"disabled"`
	DisabledReason string             `bson:"disabled_reason"`
	CreatedAt      time.Time          `bson:"created_at"`
	UpdateAt       time.Time          `bson:"updated_at"`
}
