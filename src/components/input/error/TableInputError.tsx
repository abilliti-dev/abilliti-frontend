/* eslint-disable @typescript-eslint/no-explicit-any */
interface TableInputErrorProps {
  items: any[];
  fields: string[];
}

export default function TableInputError(props: TableInputErrorProps) {
  return props.items ? (
    <div className="p-2 bg-red-100 text-red-700 rounded-lg font-medium border-2 border-red-200">
      {props.items.map((item: any, i: number) => {
        if (item)
          return (
            <div key={i}>
              <span className="text-xs uppercase font-bold underline underline-offset-2">
                Item {i + 1}
              </span>
              {props.fields.map((field: string, j: number) => {
                if (item[`${props.fields[j]}`])
                  return (
                    <div key={j} className="flex space-x-1.5 place-items-center pl-1">
                      <div className="h-1 w-1 rounded-full bg-red-700" />
                      <span className="text-xs uppercase font-bold">{field}:</span>
                      <span className="text-sm font-medium">
                        {item[`${props.fields[j]}`].message}
                      </span>
                    </div>
                  );
              })}
            </div>
          );
      })}
    </div>
  ) : null;
}
