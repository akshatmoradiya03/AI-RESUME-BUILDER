import React from "react";

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {resumeInfo?.education.length > 0 && (
        <div>
          <h2
            className=" font-bold text-sm mb-2"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            Education
          </h2>
          <hr
            style={{
              borderColor: resumeInfo?.themeColor,
            }}
          />
        </div>
      )}

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-5">
          <div className="flex justify-between items-start">
            <div>
              <h2
                className="text-sm font-bold"
                style={{
                  color: resumeInfo?.themeColor,
                }}
              >
                {education.universityName}
              </h2>
              <div className="text-xs">{education?.degree}</div>
              {education?.major && <div className="text-xs">{education?.major}</div>}
              {(education?.city || education?.state) && (
                <div className="text-xs italic">
                  {education?.city}
                  {education?.city && education?.state ? ", " : null}
                  {education?.state}
                </div>
              )}
              <div className="text-xs">
                {education?.grade ? `${education?.gradeType} - ${education?.grade}` : null}
              </div>
            </div>
            <div className="text-xs">
              {education?.startDate}
              {education?.startDate && education?.endDate ? " - " : null}
              {education?.endDate}
            </div>
          </div>
          <p className="text-xs my-2">{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
