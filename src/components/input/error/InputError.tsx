import { FieldError } from "react-hook-form";

interface InputErrorType {
  name: string;
  error?: FieldError;
}

interface InputErrorProps {
  fieldErrors: InputErrorType[];
}

export default function InputError(props: InputErrorProps) {
  return props.fieldErrors.filter((err) => !!err && !!err.error).length > 0 ? (
    <div className="pb-1.5">
      <div className="p-2 bg-red-200 text-red-700 rounded-lg font-medium">
        {props.fieldErrors.map((err: InputErrorType, i: number) => {
          if (err && err.error)
            return (
              <p key={i} className="flex space-x-1.5 place-items-center">
                <span className="text-xs uppercase font-bold">{err.name}:</span>
                <span className="text-sm font-medium">{err.error?.message}</span>
              </p>
            );
        })}
      </div>
    </div>
  ) : null;
}
