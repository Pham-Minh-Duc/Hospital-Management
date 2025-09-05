import clsx from "clsx";

interface LabelProps {
    label?: string;
    className?: string;
}
const LabelStyle = ({label, className} : LabelProps) => {
    return (
        <label className={clsx('w-[100px] text-sm mb-2 mr-2', className)}>{label}</label>
    )
}

export default LabelStyle;