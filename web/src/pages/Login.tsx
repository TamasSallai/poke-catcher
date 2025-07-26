import { useState } from 'react'
import { Link } from 'react-router'
import useLogin from '../hooks/useLogin'
import FormGroup from '../components/ui/FormGroup'

interface LoginFields {
  email: string
  password: string
}

const Login = () => {
  const { mutate: login, isPending } = useLogin()

  const [loginData, setLoginData] = useState<LoginFields>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(loginData)
  }

  return (
    <div className="p-4 max-w-lg mx-auto flex flex-col gap-5">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <FormGroup
          type="email"
          label="E-mail"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          isRequired={true}
        />

        <FormGroup
          type="password"
          label="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          isRequired={true}
        />

        <button className="button--primary" type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register.</Link>
      </p>
    </div>
  )
}

export default Login
