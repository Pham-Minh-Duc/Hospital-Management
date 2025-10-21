import clsx from "clsx";

interface SelectProps {
    // label?: string;
    className?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    option: {label: string, value: string}[];
}

const Select = ({className, value, onChange, option}: SelectProps) => {
    return(
        <select
            value={value}
            onChange={onChange}
            className={clsx("w-[200px] h-[30px] text-[12px] cursor-pointer text-black bg-white focus:outline-none rounded p-2 mr-2", className)}
        >
        {/* <option value="">{label}</option> */}
        {option.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
        </select>
    )
}

export default Select;