import { QueryClient, QueryClientProvider } from "react-query"
import "./input.css"
import { Main } from "./Main"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export default App
