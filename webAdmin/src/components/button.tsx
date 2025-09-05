
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

const ButtonStyles = ({label, onClick, className} : ButtonProps) => {
    return(
        <button
            onClick={onClick}
            className={clsx('bg-blue-500 w-[100px] h-[35px] text-[12px] cursor-pointer text-white rounded mr-2 p-2', className)}
        >
            {label}
        </button>
    )
}
export default ButtonStyles;