
import TextEditor from "@/components/TextEditor";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <TextEditor />
      <Toaster />
    </div>
  );
};

export default Index;
