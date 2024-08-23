
interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  onClick,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-11 w-40 h-10 rounded-full bg-gray-800 hover:bg-gray-700 ${className}`}
    >
      {text}
    </button>
  )
}

export default Button