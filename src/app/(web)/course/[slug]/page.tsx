import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { getCourseTest } from '@/libs/apis';
import { fileUrl } from '@/libs/sanity'
import CustomVideoPlayer from "@/components/CustomVideoPlayer/CustomVideoPlayer";
import ContactCertificate from "@/components/ContactCertificate/ContactCertificate";

type Props = {
  params: {
    slug: string;
  };
};

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = async ({ params }: Props) => {

  const slug = params.slug;
  const course = await getCourseTest(slug);

  if (!course) {
    return <div>Loading...</div>;
  }

  const pdfUrl = course.pdfFile && course.pdfFile.asset ? fileUrl(course.pdfFile.asset._ref) : null;
  // const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;
  // const videoUrl = `https://www.youtube.com/embed/${course.videoId}`

  // console.log("videoUrl", videoUrl);
  // console.log("Video _ref:", course.videoFile?.asset?._ref);

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>{course.title}</h1>
          <p className='courseDescription'>{course.description}</p>
          {course.videoId && (
            <iframe width="560" height="315"
src={`https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}
              frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          )}
          {pdfUrl && <PdfLink pdfUrl={pdfUrl} />}
        </div>
        <div className="courseContact">
          <h2 className="courseContactTitle">Zdobądź swój certyfikat</h2>
          <p className="courseContactText">Wpisz swoje imię i nazwisko w tym formularzu. W odpowiedzi prześlę Ci certyfikat e-mailem. Możesz go wydrukować lub opublikować na stronach z ofertami pracy.</p>
          <div className="courseContactForm">
            <ContactCertificate />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;