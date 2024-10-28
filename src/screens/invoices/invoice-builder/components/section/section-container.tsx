import PaginationButton from "@/components/button/pagination-button";
import IconWithTextButton from "@/components/button/icon-with-text-button";
import { ArchiveIcon } from "lucide-react";

interface SectionContainerProps {
  children: React.ReactNode;
}

export default function SectionContainer(props: SectionContainerProps) {
  return (
    <div className="rounded-xl border bg-white w-full h-full max-h-[716px] max-w-[553px] flex flex-col justify-between">
      {/* content */}
      <div className="p-3">{props.children}</div>

      {/* footer */}
      <div>
        <hr />
        <div className="flex justify-between px-3 py-2">
          <IconWithTextButton Icon={ArchiveIcon} variant={"outline"} className="font-normal">
            Save as draft
          </IconWithTextButton>
          <PaginationButton onClickPrevious={() => {}} onClickNext={() => {}} />
        </div>
      </div>
    </div>
  );
}
