import React from "react";

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      {resumeInfo?.skills.length > 0 && (
        <div>
          <h2
            className=" font-bold text-sm mb-2"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            Skills
          </h2>
          <hr
            style={{
              borderColor: resumeInfo?.themeColor,
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            {skill.name ? (
              <div className="h-2 w-[50%]">
                <div
                  className="h-2"
                  style={{
                    backgroundColor: resumeInfo.themeColor,
                    width: skill?.rating * 20 + "%",
                  }}
                ></div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {resumeInfo?.languages?.length > 0 && (
        <div className="my-2">
          <span className="font-bold text-xs">Languages: </span>
          <span className="text-xs">{resumeInfo.languages.join(', ')}</span>
        </div>
      )}
      {resumeInfo?.technologies?.length > 0 && (
        <div className="my-2">
          <span className="font-bold text-xs">Technologies: </span>
          <span className="text-xs">{resumeInfo.technologies.join(', ')}</span>
        </div>
      )}
      {resumeInfo?.concepts?.length > 0 && (
        <div className="my-2">
          <span className="font-bold text-xs">Concepts: </span>
          <span className="text-xs">{resumeInfo.concepts.join(', ')}</span>
        </div>
      )}
    </div>
  );
}

export default SkillsPreview;
