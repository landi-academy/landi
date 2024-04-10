'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Big_Shoulders_Display } from 'next/font/google';
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { getCourseBySessionId } from '@/libs/apis'; // Импортируйте функцию для получения курса по session_id
import { fileUrl, sanityClient } from '@/libs/sanity';
import { Course } from '@/types/course';

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = () => {
  const router = useRouter();
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    const loadCourse = async () => {
      // Убедитесь, что session_id является строкой
      const session_id = typeof router.query.session_id === 'string' ? router.query.session_id : null;

      if (!session_id) {
        // Обработайте случай, когда session_id не предоставлен или не является строкой
        console.error('Session ID is missing or invalid.');
        return;
      }

      // Используйте session_id для запроса данных курса
      const fetchedCourse = await getCourseBySessionId(session_id, sanityClient);
      setCourse(fetchedCourse);
    };

    if (router.isReady) {
      loadCourse();
    }
  }, [router.isReady, router.query.session_id]);

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
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
