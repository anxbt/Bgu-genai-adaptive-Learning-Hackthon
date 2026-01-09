import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { tutorAPI } from "@/lib/tutorAPI";
import { useToast } from "@/hooks/use-toast";

interface Year {
    year: number;
}

const YearSelection = () => {
    const [years, setYears] = useState<Year[]>([]);
    const [loading, setLoading] = useState(true);
    const { course } = useParams<{ course: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const fetchYears = async () => {
            if (!course) return;

            try {
                const response = await tutorAPI.getYears(course);
                setYears(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to load years. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchYears();
    }, [course, toast]);

    const handleYearSelect = (year: number) => {
        sessionStorage.setItem("selectedYear", year.toString());
        navigate(`/subjects/${encodeURIComponent(course!)}/${year}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading years...</p>
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
                        className="hover:text-blue-600 flex items-center gap-1"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <span>/</span>
                    <span className="font-medium text-gray-900">{course}</span>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Select Your Year
                    </h1>
                    <p className="text-lg text-gray-600">
                        {course}
                    </p>
                </div>

                {/* Year Selection */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {years.map((yearData) => (
                        <Card
                            key={yearData.year}
                            className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-500"
                            onClick={() => handleYearSelect(yearData.year)}
                        >
                            <CardHeader className="text-center">
                                <CardTitle className="text-4xl font-bold text-green-600">
                                    {yearData.year}
                                </CardTitle>
                                <CardDescription>Year {yearData.year}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    <span>Select</span>
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YearSelection;
