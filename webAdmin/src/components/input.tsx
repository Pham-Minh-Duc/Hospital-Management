
import clsx from "clsx";

interface InputProps {
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    readOnly?: boolean;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputStyles = ({type, placeholder, name, value, readOnly, onClick, onChange, className} : InputProps) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            readOnly={readOnly}
            onClick={onClick}
            onChange={onChange}
            className={clsx('w-[200px] h-[30px] text-[12px] cursor-pointer text-black bg-white focus:outline-none rounded p-2 mr-2',className)}
        />
    )
}

export default InputStyles;