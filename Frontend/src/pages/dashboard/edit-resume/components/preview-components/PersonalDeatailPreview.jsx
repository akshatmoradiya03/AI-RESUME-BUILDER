import React from "react";
import { FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";

function PersonalDeatailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-6 my-2">
        {resumeInfo?.phone && (
          <span className="font-normal text-xs flex items-center gap-1">
            <FaPhoneAlt /> {resumeInfo.phone}
          </span>
        )}
        {resumeInfo?.email && (
          <span className="font-normal text-xs flex items-center gap-1">
            <FaEnvelope />
            <a
              href={`mailto:${resumeInfo.email}`}
              className="underline"
            >
              {resumeInfo.email}
            </a>
          </span>
        )}
        {resumeInfo?.linkedin && (
          <span className="font-normal text-xs flex items-center gap-1">
            <FaLinkedin />
            <a
              href={resumeInfo.linkedin.startsWith('http') ? resumeInfo.linkedin : `https://${resumeInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {resumeInfo.linkedin}
            </a>
          </span>
        )}
      </div>
    </div>
  );
}

export default PersonalDeatailPreview;
