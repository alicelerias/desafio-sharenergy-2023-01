package models

type User struct {
	Name struct {
		Title string `json:"title"`
		First string `json:"first"`
		Last  string `json:"last"`
	} `json:"name"`
	Login struct {
		UserName string `json:"username"`
	} `json:"login"`

	Email string `json:"email"`
}

type Result struct {
	Results []User `json:"results"`
}
