import Link from "next/link";
import styles from "./PdfLink.module.scss";

interface PdfLinkProps {
  pdfUrl: string;
}

const PdfLink: React.FC<PdfLinkProps> = ({ pdfUrl }) => {
  return (
    <div className={styles.pdfBlock}>
      <Link
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.pdfLink}
      >
        Otwórz e-booka
      </Link>
    </div>
  );
};

export default PdfLink;