export default function SignIn({ onLogin }) {

  const testEmail = import.meta.env.VITE_USER_EMAIL
  const testPassword = import.meta.env.VITE_USER_PASSWORD

  const handleSubmitFormData = (e) => {
    e.preventDefault()

    const formDataAPI = new FormData(e.target)
    const email = formDataAPI.get('email')
    const password = formDataAPI.get('password')

    if (email === testEmail && password === testPassword) {
      alert('Login successful! Welcome to the dashboard.')

      
      if (onLogin) {
        onLogin()
      }
    } else {
      alert('Invalid credentials. Please try again.')
    }

    const dataObject = Object.fromEntries(formDataAPI)
    console.log('As object:', dataObject)
  }

  return (
    <main className="sign-in-page">
        <div className="sign-in-container">
            <h1>Sign In</h1>
            <p>Welcome user, please sign in to continue</p>
            
            <form onSubmit={handleSubmitFormData}>
                <div className="form-group">
                    <div><label htmlFor="email">Email*</label></div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                </div>

                <div className="form-group">
                   <div><label htmlFor="password">Password*</label></div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                    />
                </div>

                <button type="submit">
                Sign In
                </button>
            </form>
        </div>
    </main>
  )
}
