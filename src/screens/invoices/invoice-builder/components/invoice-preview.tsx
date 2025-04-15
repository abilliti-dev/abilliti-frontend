"use client";

import { InvoiceForm } from "@/types/invoice-form";
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import InvoicePDF from "./pdf/invoice-pdf";
import { pdf } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface InvoicePreviewProps {
  invoice: InvoiceForm;
}

export default function InvoicePreview(props: InvoicePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  const renderPdfAsImage = async () => {
    try {
      const blob = await pdf(<InvoicePDF invoice={props.invoice} />).toBlob();

      const arrayBuffer = await blob.arrayBuffer();
      const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdfDoc.getPage(pageNum);
      setPageCount(pdfDoc.numPages);

      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context as CanvasRenderingContext2D, viewport }).promise;

      setImageUrl(canvas.toDataURL("image/png"));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (nextPage: boolean) => {
    setPageNum((currPage) => (nextPage ? currPage + 1 : currPage - 1));
  };

  useEffect(() => {
    renderPdfAsImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.invoice, pageNum, pageCount]);

  if (!imageUrl) return <div className="bg-white shadow-lg w-full max-w-[28rem] h-[40rem]" />;
  return (
    <div className="space-y-2">
      <img src={imageUrl} alt="invoice-preview" className="shadow-lg max-w-[28rem]" />
      <div className="flex justify-center place-items-center text-neutral-500">
        <button
          disabled={pageNum - 1 < 1}
          className="hover:text-neutral-700 px-2 disabled:text-neutral-300"
          onClick={() => handlePagination(false)}
        >
          <ChevronLeftIcon />
        </button>

        <p className="text-sm font-medium">
          Page {pageNum} of {pageCount}
        </p>

        <button
          disabled={pageNum + 1 > pageCount}
          className="hover:text-neutral-700 px-2 disabled:text-neutral-300"
          onClick={() => handlePagination(true)}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );

  // aspect-[8.5/11] -> letter page shape
}
