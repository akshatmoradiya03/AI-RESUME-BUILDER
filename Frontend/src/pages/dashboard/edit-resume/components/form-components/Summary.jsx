import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";
function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Declare the undeclared variable using useState
  const [summary, setSummary] = useState(resumeInfo?.summary || ""); // Declare the undeclared variable using useState
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState(null); // Declare the undeclared variable using useState
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Started Saving Summary");
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateThisResume(resume_id, data)
        .then((data) => {
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          toast("Error updating resume", `${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  }; // Declare the undeclared variable using useState

  const setSummery = (summary) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summary,
      })
    );
    setSummary(summary);
  };

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    console.log("Generate Summery From AI for", resumeInfo?.jobTitle);
    if (!resumeInfo?.jobTitle) {
      toast("Please Add Job Title");
      setLoading(false);
      return;
    }
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      // Await the text() method for Gemini API
      const text = await result.response.text();
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        parsed = [];
      }
      console.log("AI Response:", parsed);
      if (Array.isArray(parsed)) {
        setAiGenerateSummeryList({ experiences: parsed });
      } else if (Array.isArray(parsed?.experiences)) {
        setAiGenerateSummeryList(parsed);
      } else if (Array.isArray(parsed?.summaries)) {
        setAiGenerateSummeryList({ experiences: parsed.summaries });
      } else if (Array.isArray(parsed?.Summaries)) {
        setAiGenerateSummeryList(parsed);
      } else if (Array.isArray(parsed?.summary_list)) {
        setAiGenerateSummeryList(parsed);
      } else {
        setAiGenerateSummeryList([]);
        toast("AI did not return a valid summary list.", "error");
      }
      toast("Summery Generated", "success");
    } catch (error) {
      console.log(error);
      toast(error.message, `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Add normalization function
  function normalizeSummaryList(aiResponse) {
    if (!aiResponse) return [];
    if (Array.isArray(aiResponse)) return aiResponse;
    if (Array.isArray(aiResponse.summary_list)) return aiResponse.summary_list;
    if (Array.isArray(aiResponse.Summaries)) return aiResponse.Summaries;
    if (Array.isArray(aiResponse.summaries)) return aiResponse.summaries;
    if (Array.isArray(aiResponse.experiences)) return aiResponse.experiences;
    return [];
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Sparkles className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            value={summary ? summary : resumeInfo?.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* Robust suggestions rendering */}
      {(() => {
        const suggestions = normalizeSummaryList(aiGeneratedSummeryList);
        return suggestions.length > 0 && (
          <div className="my-5">
            <h2 className="font-bold text-lg">Suggestions</h2>
            {suggestions.map((item, index) => (
              <div
                key={index}
                className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
                onClick={() => {
                  enanbledNext(false);
                  enanbledPrev(false);
                  setSummery(item.summary || item.summery);
                }}
              >
                <h2 className="font-bold my-1 text-primary">
                  Level: {item?.experience_level}
                </h2>
                <p>{item.summary || item.summery}</p>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

export default Summary;
