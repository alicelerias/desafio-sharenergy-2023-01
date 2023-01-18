export type User = {
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  login: {
    username: string
  }
  dob: {
    age: string
  }
  picture: {
    medium: string
  }
}

export type Users = {
  results: User[]
}
