import { BaseInputProps } from "./base-input";

interface InputGroupProps {
  row1Inputs: ((props: BaseInputProps) => JSX.Element)[];
  row2Inputs: ((props: BaseInputProps) => JSX.Element)[];
}

export default function InputGroup(props: InputGroupProps) {
  return (
    <div className="grid grid-rows-2 divide-y rounded-xl border">
      <div className="grid grid-flow-col divide-x">
        {props.row1Inputs.map((Input, i) => {
          const isFirst = i === 0;
          const isLast = i === props.row1Inputs.length - 1;
          const rounding = isFirst ? "rounded-tl-xl" : isLast ? "rounded-tr-xl" : "rounded-none";
          return <Input rounding={rounding} hideBorder />;
        })}
      </div>
      <div className="grid grid-flow-col divide-x">
        {props.row2Inputs.map((Input, i) => {
          const isFirst = i === 0;
          const isLast = i === props.row2Inputs.length - 1;
          const rounding = isFirst ? "rounded-bl-xl" : isLast ? "rounded-br-xl" : "rounded-none";
          return <Input rounding={rounding} hideBorder />;
        })}
      </div>
    </div>
  );
}
