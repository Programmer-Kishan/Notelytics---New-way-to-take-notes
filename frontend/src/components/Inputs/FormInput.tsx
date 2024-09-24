
interface FormInputProps {
    label: string,
    type: string,
    name: string,
    disabled: boolean,
    notRequired?: boolean
}

const FormInput = ({label, type, name, disabled}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      {/* <label htmlFor={label}>{label}</label> */}
      <input 
        placeholder={label} 
        type={type}
        name={name}
        disabled={disabled}
        required
        className="p-2 bg-transparent font-poppins text-[#EAEAEA] rounded-md border border-[#EAEAEA] focus:outline-0"
      />
    </div>
  )
}

export default FormInput
