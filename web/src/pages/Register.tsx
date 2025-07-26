import { useState } from 'react'
import { Link } from 'react-router'
import useRegister from '../hooks/useRegister'
import FormGroup from '../components/ui/FormGroup'

interface RegisterFields {
  displayName: string
  email: string
  password: string
}

const RegisterForm = () => {
  const { mutate, isPending } = useRegister()

  const [registerData, setRegisterData] = useState<RegisterFields>({
    displayName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(registerData)
  }

  return (
    <div className="p-4 max-w-lg mx-auto flex flex-col gap-5">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <FormGroup
          type="text"
          label="DisplayName"
          name="displayName"
          value={registerData.displayName}
          onChange={handleChange}
          isRequired={true}
        />

        <FormGroup
          type="email"
          label="E-mail"
          name="email"
          value={registerData.email}
          onChange={handleChange}
          isRequired={true}
        />

        <FormGroup
          type="password"
          label="Password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          isRequired={true}
        />

        <button className="button--primary" type="submit" disabled={isPending}>
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log in.</Link>
      </p>
    </div>
  )
}

export default RegisterForm
