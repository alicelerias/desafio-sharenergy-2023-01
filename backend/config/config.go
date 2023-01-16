package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AuthCookie        string
	Host              string
	AllowedHosts      string
	LoginPage         string
	ApiRandomUser     string
	ApiHttpCat        string
	ApiRandomDog      string
	MongoDbConnection string
	Database          string
	Collection        string
	JWTSecret         string
}

var config *Config

func GetConfig() *Config {
	if config == nil {
		godotenv.Load()

		config = &Config{
			AuthCookie:        os.Getenv("AUTH_COOKIE"),
			Host:              os.Getenv("HOST"),
			AllowedHosts:      os.Getenv("ALLOWED_HOSTS"),
			LoginPage:         os.Getenv("LOGIN_PAGE"),
			ApiRandomUser:     os.Getenv("API_RANDOM_USER"),
			ApiHttpCat:        os.Getenv("API_HTTP_CAT"),
			ApiRandomDog:      os.Getenv("API_RANDOM_DOG"),
			MongoDbConnection: os.Getenv("CONNECTION"),
			Database:          os.Getenv("DATABASE"),
			JWTSecret:         os.Getenv("JWT_SECRET"),
		}
	}

	return config
}
