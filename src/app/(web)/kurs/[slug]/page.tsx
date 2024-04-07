import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { getCourse } from '@/libs/apis';
import { fileUrl } from '@/libs/sanity'

type Props = {
  params: {
    slug: string;
  };
};

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = async ({ params }: Props) => {

  const slug = params.slug;
  const course = await getCourse(slug);

  if (!course) {
    return <div>Loading...</div>;
  }

  const pdfUrl = course.pdfFile && course.pdfFile.asset ? fileUrl(course.pdfFile.asset._ref) : null;
  const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;

  // console.log("videoUrl", videoUrl);
  // console.log("Video _ref:", course.videoFile?.asset?._ref);

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>{course.title}</h1>
          <p className='courseDescription'>{course.description}</p>
          {videoUrl && <VideoComponent videoUrl={videoUrl} />}
          {pdfUrl && <PdfLink pdfUrl={pdfUrl} />}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;