import { LucideIcon } from "lucide-react";

interface InputProps {
  id?: string;
  type: string;
  name?: string;
  iconStyle: {
    size: number;
    className: string;
  };
  style: string;
  Icon: LucideIcon;
  required?: boolean;
  placeholder?: string;
}

export function InputWithIcon({
  id,
  type,
  name,
  iconStyle,
  style,
  Icon,
  required,
  placeholder,
}: InputProps) {
  return (
    <div className="relative w-full">
      <Icon className={iconStyle.className} size={iconStyle.size} />
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={style}
        required={required}
      />
    </div>
  );
}
