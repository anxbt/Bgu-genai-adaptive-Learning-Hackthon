import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { tutorAPI } from "@/lib/tutorAPI";
import { useToast } from "@/hooks/use-toast";

interface Subject {
    id: string;
    name: string;
    description: string;
    icon: string;
    topicCount: number;
}

const SubjectSelection = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const { course, year } = useParams<{ course: string; year: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const fetchSubjects = async () => {
            if (!course || !year) return;

            try {
                const response = await tutorAPI.getSubjects(course, parseInt(year));
                setSubjects(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load subjects. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [course, year, toast]);

    const handleSubjectSelect = (subjectId: string) => {
        sessionStorage.setItem("selectedSubject", subjectId);
        navigate(`/topics/${subjectId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading subjects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="hover:text-blue-600"
                    >
                        Home
                    </button>
                    <span>/</span>
                    <button
                        onClick={() => navigate(`/years/${encodeURIComponent(course!)}`)}
                        className="hover:text-blue-600"
                    >
                        {course}
                    </button>
                    <span>/</span>
                    <span className="font-medium text-gray-900">Year {year}</span>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Select Your Subject
                    </h1>
                    <p className="text-lg text-gray-600">
                        {course} • Year {year}
                    </p>
                </div>

                {/* Subject Selection */}
                <div className="grid gap-6 md:grid-cols-2">
                    {subjects.map((subject) => (
                        <Card
                            key={subject.id}
                            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-500"
                            onClick={() => handleSubjectSelect(subject.id)}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{subject.icon}</span>
                                    <div>
                                        <CardTitle>{subject.name}</CardTitle>
                                        <CardDescription>{subject.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {subject.topicCount} topics available
                                    </span>
                                    <Button variant="outline" size="sm">
                                        <span>Select</span>
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Back button */}
                <div className="mt-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/years/${encodeURIComponent(course!)}`)}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Years
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SubjectSelection;
