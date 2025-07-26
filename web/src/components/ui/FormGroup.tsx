interface Props {
  type: 'email' | 'password' | 'text'
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isRequired?: boolean
}

const FormGroup = ({
  type,
  label,
  name,
  value,
  onChange,
  isRequired = false,
}: Props) => {
  return (
    <div className="flex flex-col grow">
      <label className="text-md font-medium text-gray-900" htmlFor="email">
        {label}
      </label>
      <input
        className="px-4 py-2 mt-2 rounded-sm text-gray-900 placeholder:text-gray-400  outline-1 outline-gray-400 focus:outline-2 focus:outline-blue-400"
        type={type}
        id="email"
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
      />
    </div>
  )
}

export default FormGroup
