import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationButtonProps {
  onClickPrevious?: () => void;
  onClickNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

export default function PaginationButton(props: PaginationButtonProps) {
  return (
    <div className="border rounded-md flex place-items-center divide-x h-fit">
      <div>
        <Button
          type="button"
          size={"sm"}
          variant={"ghost"}
          onClick={props.onClickPrevious}
          className="rounded-r-none text-neutral-600 disabled:text-neutral-400"
          disabled={props.disablePrevious}
        >
          <ChevronLeftIcon strokeWidth={1.5} />
        </Button>
      </div>
      <div>
        <Button
          type="button"
          size={"sm"}
          variant={"ghost"}
          onClick={props.onClickNext}
          className="rounded-l-none text-neutral-600 disabled:text-neutral-400"
          disabled={props.disableNext}
        >
          <ChevronRightIcon strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
