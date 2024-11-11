import { BaseInputProps } from "./base-input";

interface InputGroupProps {
  row1Inputs: ((props: BaseInputProps) => JSX.Element)[];
  row2Inputs?: ((props: BaseInputProps) => JSX.Element)[];
}

export default function InputGroup(props: InputGroupProps) {
  return (
    <div className="grid grid-flow-row divide-y rounded-xl border border-neutral-300">
      <div className="grid grid-flow-col auto-cols-fr divide-x">
        {props.row1Inputs.map((Input, i) => {
          const isSingleRow = props.row2Inputs === undefined || props.row2Inputs.length === 0;
          const isAlone = props.row1Inputs.length === 1;
          const isFirst = i === 0;
          const isLast = i === props.row1Inputs.length - 1;
          const rounding = isAlone
            ? "rounded-t-xl"
            : isSingleRow && isFirst
            ? "rounded-l-xl"
            : isSingleRow && isLast
            ? "rounded-r-xl"
            : isFirst
            ? "rounded-tl-xl"
            : isLast
            ? "rounded-tr-xl"
            : "rounded-sm";
          return <Input rounding={rounding} key={i} hideBorder />;
        })}
      </div>
      {props.row2Inputs && props.row2Inputs.length > 0 && (
        <div className="grid grid-flow-col auto-cols-fr divide-x">
          {props.row2Inputs.map((Input, i) => {
            const isAlone = props.row2Inputs && props.row2Inputs.length === 1;
            const isFirst = i === 0;
            const isLast = props.row2Inputs && i === props.row2Inputs.length - 1;
            const rounding = isAlone
              ? "rounded-b-xl"
              : isFirst
              ? "rounded-bl-xl"
              : isLast
              ? "rounded-br-xl"
              : "rounded-sm";
            return <Input rounding={rounding} key={i} hideBorder />;
          })}
        </div>
      )}
    </div>
  );
}
