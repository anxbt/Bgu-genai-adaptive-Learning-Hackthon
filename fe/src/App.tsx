import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseSelection from "./pages/CourseSelection";
import YearSelection from "./pages/YearSelection";
import SubjectSelection from "./pages/SubjectSelection";
import TopicSelection from "./pages/TopicSelection";
import QuestionAttempt from "./pages/QuestionAttempt";
import Explanation from "./pages/Explanation";
import Retry from "./pages/Retry";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Academic Navigation Flow */}
          <Route path="/" element={<CourseSelection />} />
          <Route path="/years/:course" element={<YearSelection />} />
          <Route path="/subjects/:course/:year" element={<SubjectSelection />} />
          <Route path="/topics/:subjectId" element={<TopicSelection />} />

          {/* Question & Tutoring Flow */}
          <Route path="/question/:topicId" element={<QuestionAttempt />} />
          <Route path="/explanation/:questionId" element={<Explanation />} />
          <Route path="/retry/:topicId" element={<Retry />} />
          <Route path="/progress" element={<Progress />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
