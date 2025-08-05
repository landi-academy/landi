"use client";
import { useState, useEffect, useRef } from "react";
import { Big_Shoulders_Display } from "next/font/google";
import PdfLink from "@/components/PdfLink/PdfLink";
import { getCourseTest } from "@/libs/apis";
import { fileUrl } from "@/libs/sanity";
import CustomVideoPlayer from "@/components/CustomVideoPlayer/CustomVideoPlayer";
import ContactCertificate from "@/components/ContactCertificate/ContactCertificate";
import { Course } from "@/types/course";

type Props = {
  params: {
    slug: string;
  };
};

const bigShoulders = Big_Shoulders_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const CoursePage = ({ params }: Props) => {
  const [course, setCourse] = useState<Course | null>(null); // Используйте useState для хранения данных

  useEffect(() => {
    // Используйте useEffect для получения данных
    const fetchData = async () => {
      try {
        const slug = params.slug;
        const fetchedCourse = await getCourseTest(slug);
        setCourse(fetchedCourse);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [params.slug]); // Зависимость от params.slug

  if (!course) {
    return <div>Loading...</div>;
  }

  const pdfUrl =
    course.pdfFile && course.pdfFile.asset
      ? fileUrl(course.pdfFile.asset._ref)
      : null;
  // const videoUrl = course.videoFile && course.videoFile.asset ? fileUrl(course.videoFile.asset._ref) : null;
  // let videoUrl = `https://drive.google.com/file/d/1ZZU5NIf_IRTg3TrC-2oRMMVjzluJ4C-o/preview`
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL;

  // console.log("videoUrl", videoUrl);
  // console.log("Video _ref:", course.videoFile?.asset?._ref);

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>
            {course.title}
          </h1>
          <div className="courseContainer">
            <p className="courseDescription">{course.description}</p>
          </div>
          <div className="courseBlock">
            {/* <h2 className="courseSubtitle">1. Część teoretyczna</h2> */}
            <p className="courseText">
              Kliknij w poniższy link i otwórz e-book z częścią teoretyczną
              kursu.
            </p>
            {pdfUrl && <PdfLink pdfUrl={pdfUrl} />}
          </div>
          <div className="courseBlock">
            <h2 className="courseSubtitle">2. Część praktyczna</h2>
            <p className="courseText">
              Obejrzyj poniższy film z częścią praktyczną kursu.
            </p>
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
            </div>
          </div>
        </div>
        <div className="courseContainer">
          <h2 className="courseContactTitle">3. Zdobądź swój certyfikat</h2>
          <p className="courseContactText">
            Wpisz swoje imię i nazwisko w tym formularzu. W odpowiedzi prześlę
            Ci certyfikat e-mailem. Możesz go wydrukować lub opublikować na
            stronach z ofertami pracy.
          </p>
          <div className="courseContactForm">
            <ContactCertificate />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
