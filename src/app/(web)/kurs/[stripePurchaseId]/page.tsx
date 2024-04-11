'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { fileUrl } from '@/libs/sanity'
import { checkAccess, getCourse } from "@/libs/apis";
import { Course } from "@/types/course";

type Props = {
  params: {
    slug: string;
  };
};

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = ({ params }: Props) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  // const slug = params.slug;
  // const { slug } = params;
  const stripePurchaseId = searchParams.get('stripePurchaseId');
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Проверяем доступ, используя stripePurchaseId
    if (stripePurchaseId) {
      checkAccess(stripePurchaseId).then((hasAccess) => {
        if (!hasAccess) {
          router.push('/'); // Перенаправление при отсутствии доступа
        } else {
          // Загрузка и отображение данных курса при наличии доступа
          getCourse(stripePurchaseId).then((courseData) => {
            setCourse(courseData);
          });
        }
      });
    }
  }, [stripePurchaseId, searchParams]);

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