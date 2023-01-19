import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  useForm,
  Validate,
} from "react-hook-form"

type props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type: string
  placeholder: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  controller: any
}

export const InputForm: React.FC<props> = ({
  type,
  placeholder,
  error,
  controller,
  ...rest
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 bg-blue-design  placeholder-gray-200 w-full focus:outline-none text-white "
        {...controller}
        {...rest}
      />
      {error && (
        <div className="text-red-600 text-sm">
          {(error?.message as string) || "Campo inválido!"}
        </div>
      )}
    </div>
  )
}
