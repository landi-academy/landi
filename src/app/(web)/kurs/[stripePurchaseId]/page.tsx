'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { Course } from "@/types/course";
import { checkAccess, getCourse } from "@/libs/apis";

type Props = {
  params: {
    slug: string;
  };
};

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = ({ params }: Props) => {
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const searchParams = useSearchParams();
  const stripePurchaseId = searchParams.get('stripePurchaseId');

  useEffect(() => {
    if (stripePurchaseId) {
      // Предположим, что checkAccess возвращает true или false в зависимости от доступа
      checkAccess(stripePurchaseId).then((access) => {
        if (!access) {
          setAccessDenied(true); // Если доступ закрыт, отобразим сообщение об этом
        } else {
          setHasAccess(true); // Если доступ открыт, позволим рендерить страницу
        }
      });
    }
  }, [stripePurchaseId]);

  if (accessDenied) {
    // Возвращаем сообщение о запрете доступа
    return <div>Access Denied. Please <a href="/contact">contact support</a> if you think this is a mistake.</div>;
  }

  if (!hasAccess) {
    // Пока проверяем доступ, показываем загрузку
    return <div>Loading for access...</div>;
  }

  // Как только доступ подтвержден, рендерим содержимое страницы
  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>Course Title Here</h1>
          <p className='courseDescription'>Course description goes here.</p>
          {/* Здесь могут быть другие компоненты, относящиеся к курсу, например, VideoComponent или PdfLink */}
          {/* Пример: */}
          {/* videoUrl && <VideoComponent videoUrl={videoUrl} /> */}
          {/* pdfUrl && <PdfLink pdfUrl={pdfUrl} /> */}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;

// Обратите внимание, вам нужно будет определить функцию checkAccess и импортировать необходимые зависимости
