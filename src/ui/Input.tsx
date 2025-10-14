export interface InputProps {
    label: string;
    type: 'text' | 'number' | 'Date' | 'email' | 'password';
    value: string ;
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void ;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    // hasError?: boolean;
}

export const Input: React.FC <InputProps> = ({
    label,
    type= 'text' ,
    value ,
    name,
    placeholder,
    onChange,
    onBlur,

}) => {
    return (
        <div>
        {label && <label> {label} </label>}
        <input  type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
    </div>
    );
}