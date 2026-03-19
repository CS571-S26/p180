import Header from '../components/Header'

export function HomePage({ children }) {
  return (
    <div>
      <Header />
      <main className="container mt-4 text-center">
        <h1>Room Radar</h1>
        <p>Welcome to Room Radar!</p>
      </main>
    </div>
  )
}