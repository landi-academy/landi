'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { getCourseBySessionId } from '@/libs/apis';
import { fileUrl } from '@/libs/sanity';
import { Course } from '@/types/course';

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = () => {
  const router = useRouter();
  const { session_id } = router.query; // Используйте session_id вместо slug
  const [course, setCourse] = useState<Course | null>(null);

useEffect(() => {
  // Приведение session_id к строке, если это массив
  const sessionId = Array.isArray(session_id) ? session_id[0] : session_id;
  if (!sessionId) return;
  const fetchCourse = async () => {
    const data = await getCourseBySessionId(sessionId);
    setCourse(data);
  };

  fetchCourse();
}, [session_id]);

  if (!course) {
    return <div>Loading...</div>;
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
          <div>Тут будут мои данные на основании </div>
          <div>{session_id}</div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
