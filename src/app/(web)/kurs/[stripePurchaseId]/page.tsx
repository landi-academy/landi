'use client';
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import { checkAccess, getCourse } from "@/libs/apis";
import { fileUrl } from '@/libs/sanity';
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { Course } from '@/types/course';
import ContactCertificate from '@/components/ContactCertificate/ContactCertificate';

import splashImage from '/public/splashImage.jpg';
import CustomVideoPlayer from '@/components/CustomVideoPlayer/CustomVideoPlayer';

type Props = {
  params: {
    slug: string;
    stripePurchaseId: string;
  };
};

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = ({ params }: Props) => {
  const [accessDenied, setAccessDenied] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [course, setCourse] = useState<Course | null>(null); // State to store course data
  const stripePurchaseId = params.stripePurchaseId;

  useEffect(() => {
    if (stripePurchaseId) {
      checkAccess(stripePurchaseId).then(access => {
        if (!access) {
          setAccessDenied(true);
        } else {
          setHasAccess(true);
          getCourse().then(fetchedCourse => {
            setCourse(fetchedCourse); // Store the fetched course data in state
          }).catch(error => {
            console.error('Error getting course:', error);
          });
        }
      }).catch(error => {
        console.error('Error checking access:', error);
      });
    }
  }, [stripePurchaseId]);

  if (accessDenied) {
    return <div>Access Denied. Please <a href="/contact">contact support</a> if you think this is a mistake.</div>;
  }

  if (!hasAccess || !course) { // Check for course data as well
    return <div>Loading for access...</div>;
  }

  const pdfUrl = course.pdfFile && course.pdfFile.asset ? fileUrl(course.pdfFile.asset._ref) : null;
  // const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;
  const videoUrl = course.videoUrl;

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>{course.title}</h1>
          <div className="courseContainer">
            <h2 className="courseSubtitle">Koniecznie zachowaj link do tej strony aby mieć dostęp na szkolenie przez 14 dni.</h2>
            <p className='courseDescription'>{course.description}</p>
          </div>
          <div className="courseBlock">
            <h2 className="courseSubtitle">1. Część teoretyczna</h2>
            <p className="courseText">Kliknij w poniższy link i otwórz e-book z częścią teoretyczną kursu.</p>
            {pdfUrl && <PdfLink pdfUrl={pdfUrl} />}
          </div>
          <div className="courseBlock">
            <h2 className="courseSubtitle">2. Część praktyczna</h2>
            <p className="courseText">Obejrzyj poniższy film z częścią praktyczną kursu.</p>
            {/* {course.videoId && (
              <CustomVideoPlayer videoUrl={videoUrl} />
            )} */}
            <div className="video">
              <iframe
                src={videoUrl}
                allow="autoplay"
                allowFullScreen
                className="responsive-iframe"
              ></iframe>
               <CustomVideoPlayer videoUrl={videoUrl} splashUrl={splashImage.src} />
            </div>
          </div>
        </div>
        <div className="courseContainer">
          <h2 className="courseContactTitle">3. Zdobądź swój certyfikat</h2>
          <p className="courseContactText">Wpisz swoje imię i nazwisko w tym formularzu. W odpowiedzi prześlę Ci certyfikat e-mailem.</p>
          <div className="courseContactForm">
            <ContactCertificate />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
