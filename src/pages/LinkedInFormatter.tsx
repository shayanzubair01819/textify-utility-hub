
import { TextEditor } from "@/components/LinkedInTextEditor";
import { Toaster } from "@/components/ui/toaster";

const LinkedInFormatter = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <TextEditor />
      <Toaster />
    </div>
  );
};

export default LinkedInFormatter;
