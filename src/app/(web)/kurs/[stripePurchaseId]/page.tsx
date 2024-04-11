'use client';
import { useEffect, useState } from 'react';
import { Big_Shoulders_Display } from "next/font/google";
import { checkAccess, getCourse } from "@/libs/apis";

// Предполагается, что Props и другие зависимости уже определены

const bigShoulders = Big_Shoulders_Display({ weight: ['400', '700'], subsets: ["latin"] });

const CoursePage = () => {
  const [accessDenied, setAccessDenied] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  
  useEffect(() => {
    // Используем window.location.search для получения строки запроса
    const searchParams = new URLSearchParams(window.location.search);
    const stripePurchaseId = searchParams.get('stripePurchaseId');

    console.log('stripePurchaseId:', stripePurchaseId);

    if (stripePurchaseId) {
      checkAccess(stripePurchaseId).then((access) => {
        setHasAccess(access);
        setAccessDenied(!access);
      });
    }
  }, []);

  if (accessDenied) {
    return <div>Access Denied. Please <a href="/contact">contact support</a> if you think this is a mistake.</div>;
  }

  if (!hasAccess) {
    return <div>Loading for access...</div>;
  }

  return (
    <main className="course">
      <div className="container">
        <div className="courseWrapper">
          <h1 className={`courseTitle ${bigShoulders.className}`}>Course Title Here</h1>
          <p className='courseDescription'>Course description goes here.</p>
          {/* Другие компоненты курса */}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
