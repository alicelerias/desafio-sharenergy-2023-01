package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AuthCookie    string
	Host          string
	LoginPage     string
	ApiRandomUser string
	ApiHttpCat    string
	ApiRandomDog  string
}

var config *Config

func GetConfig() *Config {
	if config == nil {
		godotenv.Load()

		config = &Config{
			AuthCookie:    os.Getenv("AUTH_COOKIE"),
			Host:          os.Getenv("HOST"),
			LoginPage:     os.Getenv("LOGIN_PAGE"),
			ApiRandomUser: os.Getenv("API_RANDOM_USER"),
			ApiHttpCat:    os.Getenv("API_HTTP_CAT"),
			ApiRandomDog:  os.Getenv("API_RANDOM_DOG"),
		}
	}

	return config
}
