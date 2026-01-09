import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { tutorAPI } from "@/lib/tutorAPI";
import { useToast } from "@/hooks/use-toast";

interface Course {
    course: string;
    description: string;
}

const CourseSelection = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await tutorAPI.getCourses();
                setCourses(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load courses. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [toast]);

    const handleCourseSelect = (courseName: string) => {
        // Store course in session storage
        sessionStorage.setItem("selectedCourse", courseName);
        navigate(`/years/${encodeURIComponent(courseName)}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        AI Adaptive Tutor
                    </h1>
                    <p className="text-lg text-gray-600">
                        Confusion-Aware Learning Platform
                    </p>
                </div>

                {/* Course Selection */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Select Your Course
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {courses.map((course) => (
                            <Card
                                key={course.course}
                                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-500"
                                onClick={() => handleCourseSelect(course.course)}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{course.course}</span>
                                        <ArrowRight className="w-5 h-5 text-blue-600" />
                                    </CardTitle>
                                    <CardDescription>{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full" variant="outline">
                                        Select Course
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">
                        How it works
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>• Select your course and year</li>
                        <li>• Choose a subject and topic</li>
                        <li>• Answer questions to test your understanding</li>
                        <li>• Get AI-powered explanations when you're confused</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseSelection;
