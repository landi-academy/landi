interface PdfLinkProps {
  pdfUrl: string;
}

const PdfLink: React.FC<PdfLinkProps> = ({ pdfUrl }) => {
  return (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
      Śledź ten link
    </a>
  );
};

export default PdfLink;