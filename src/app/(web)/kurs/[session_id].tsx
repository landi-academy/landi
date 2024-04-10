'use client';
import { useState, useEffect } from 'react';
// import { createClient } from "next-sanity";
import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { getCourseBySessionId } from '@/libs/apis'; // Импортируйте новую функцию
import { fileUrl, sanityClient} from '@/libs/sanity'; // Импортируйте sanityClient
import { useRouter } from "next/router";

// export const sanityClient = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
//   apiVersion: "2023-10-16",
//   useCdn: false,
//   token: process.env.SANITY_STUDIO_TOKEN,
// });

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = async () => {
  const router = useRouter();
  // Убедитесь, что session_id является строкой
  const session_id = typeof router.query.session_id === 'string' ? router.query.session_id : null;

  const [myCourse, setMyCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!session_id) {
    // Обработайте случай, когда session_id не предоставлен или не является строкой
    return <div>Session ID is missing or invalid.</div>;
  }

  // Используйте session_id для запроса данных курса
  const course = await getCourseBySessionId(session_id, sanityClient);

  // if (!course) {
  //   return <div>Loading...</div>;
  // }

    useEffect(() => {
    const loadCourse = async () => {
      try {
        const session_id = typeof router.query.session_id === 'string' ? router.query.session_id : null;
        if (!session_id) {
          throw new Error('Session ID is missing or invalid.');
        }
        const courseData = await getCourseBySessionId(session_id, sanityClient);
        if (!courseData) {
          throw new Error('Course not found.');
        }
        setMyCourse(courseData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [router.query.session_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found.</div>;
  }

  const pdfUrl = course.pdfFile && course.pdfFile.asset ? fileUrl(course.pdfFile.asset._ref) : null;
  const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;

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
