
import clsx from "clsx";

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    readonly?: boolean;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const InputStyles = ({type, placeholder, value, readonly, onClick, onChange, className} : InputProps) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            readOnly={readonly}
            onClick={onClick}
            onChange={onChange}
            className={clsx('w-[200px] h-[30px] text-[12px] cursor-pointer text-black bg-white focus:outline-none rounded p-2 mr-2',className)}
        />
    )
}

export default InputStyles;