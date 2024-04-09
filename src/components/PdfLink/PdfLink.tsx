import Link from "next/link";

interface PdfLinkProps {
  pdfUrl: string;
}

const PdfLink: React.FC<PdfLinkProps> = ({ pdfUrl }) => {
  return (
    <Link href={pdfUrl} target="_blank" rel="noopener noreferrer">
      Śledź ten link
    </Link>
  );
};

export default PdfLink;