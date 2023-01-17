export type Users = {
  results: {
    name: {
      title: string,
      first: string,
      last: string
    },
    email: string,
    login: {
      username: string
    }
    dob: {
      age: string,
    }
    picture: {
      medium: string
    }
  }[]
}