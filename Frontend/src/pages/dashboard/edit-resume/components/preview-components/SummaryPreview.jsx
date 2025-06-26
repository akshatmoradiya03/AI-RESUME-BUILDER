import React from 'react'

function SummaryPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2 className=" font-bold text-sm mb-2" style={{ color: resumeInfo?.themeColor }}>
        Profile Summary
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.summary && (
        <div className="text-xs my-2">
          {resumeInfo.summary}
        </div>
      )}
    </div>
  )
}

export default SummaryPreview