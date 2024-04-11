'use client';
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import { checkAccess, getCourse } from "@/libs/apis";
import { fileUrl } from '@/libs/sanity';
import PdfLink from '@/components/PdfLink/PdfLink';
import VideoComponent from '@/components/VideoComponent/VideoComponent';
import { Course } from '@/types/course';

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
  const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>Course Title Here</h1>
          <p className='courseDescription'>Course description goes here.</p>
          {videoUrl && <VideoComponent videoUrl={videoUrl} />}
          {pdfUrl && <PdfLink pdfUrl={pdfUrl} />}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
