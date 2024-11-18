function App() {
  return (
    <>
      <div
        className="h-screen w-screen text-900 bg-gray-50/50 flex items-center
      justify-center"
      >
        <Toolbar />
      </div>
    </>
  )
}

const Toolbar = () => {
  return (
    <div className="h-16 w-auto dark:bg-gray-950 bg-white rounded-2xl shadow-elevated hover:shadow-rised transition-shadow ease-in-out duration-300">
      test
    </div>
  )
}

export default App
