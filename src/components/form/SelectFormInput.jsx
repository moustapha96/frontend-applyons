import { Controller } from "react-hook-form"
import { Select } from "antd"

const SelectFormInput = ({
    label,
    name,
    control,
    options,
    labelClassName,
    className,
    placeholder,
    error,
    fullWidth,
    ...props
}) => {
    return (
        <div className={fullWidth ? "w-full" : ""}>
            {label && <label className={labelClassName}>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Select
                            {...field}
                            className={className}
                            options={options}
                            placeholder={placeholder}
                            status={error ? "error" : ""}
                            {...props}
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                    </>
                )}
            />
        </div>
    )
}

export default SelectFormInput
