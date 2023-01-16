package types

type User struct {
	Name struct {
		Title string `json:"title"`
		First string `json:"first"`
		Last  string `json:"last"`
	} `json:"name"`
	Login struct {
		UserName string `json:"username"`
		Password string `json:"password"`
	} `json:"login"`
	Email string `json:"email"`
	DOB   struct {
		Age int32 `json:"age"`
	} `json:"dob"`
	Picture struct {
		Medium string `json:"medium"`
	} `json:"picture"`
}

type Result struct {
	Results []User `json:"results"`
}
