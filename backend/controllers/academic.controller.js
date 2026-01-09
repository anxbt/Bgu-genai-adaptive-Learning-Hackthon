/**
 * Academic Controller
 * Business logic for academic navigation
 */

const academicModel = require('../models/academic.model');
const ResponseFormatter = require('../utils/responseFormatter');

class AcademicController {
    /**
     * GET /api/courses
     * Get all available courses
     */
    getCourses(req, res) {
        try {
            const courses = academicModel.getAllCourses();

            res.json(ResponseFormatter.success(courses, {
                count: courses.length
            }));
        } catch (error) {
            console.error('Get courses error:', error);
            res.status(500).json(
                ResponseFormatter.error('Failed to fetch courses', 500, {
                    message: error.message
                })
            );
        }
    }

    /**
     * GET /api/courses/:course/years
     * Get years for a specific course
     */
    getYears(req, res) {
        try {
            const { course } = req.params;
            const years = academicModel.getYearsByCourse(course);

            if (!years) {
                return res.status(404).json(
                    ResponseFormatter.error(`Course '${course}' not found`, 404)
                );
            }

            res.json(ResponseFormatter.success(years, {
                course,
                count: years.length
            }));
        } catch (error) {
            console.error('Get years error:', error);
            res.status(500).json(
                ResponseFormatter.error('Failed to fetch years', 500, {
                    message: error.message
                })
            );
        }
    }

    /**
     * GET /api/courses/:course/years/:year/subjects
     * Get subjects for a specific course and year
     */
    getSubjects(req, res) {
        try {
            const { course, year } = req.params;
            const subjects = academicModel.getSubjectsByYear(course, year);

            if (!subjects) {
                return res.status(404).json(
                    ResponseFormatter.error(
                        `Subjects not found for ${course} Year ${year}`,
                        404
                    )
                );
            }

            res.json(ResponseFormatter.success(subjects, {
                course,
                year: parseInt(year),
                count: subjects.length
            }));
        } catch (error) {
            console.error('Get subjects error:', error);
            res.status(500).json(
                ResponseFormatter.error('Failed to fetch subjects', 500, {
                    message: error.message
                })
            );
        }
    }

    /**
     * GET /api/subjects/:subjectId/topics
     * Get topics for a specific subject
     */
    getTopics(req, res) {
        try {
            const { subjectId } = req.params;
            const topics = academicModel.getTopicsBySubject(subjectId);

            if (!topics) {
                return res.status(404).json(
                    ResponseFormatter.error(`Subject '${subjectId}' not found`, 404)
                );
            }

            res.json(ResponseFormatter.success(topics, {
                subjectId,
                count: topics.length
            }));
        } catch (error) {
            console.error('Get topics error:', error);
            res.status(500).json(
                ResponseFormatter.error('Failed to fetch topics', 500, {
                    message: error.message
                })
            );
        }
    }

    /**
     * GET /api/topics/:topicId/questions
     * Get questions for a specific topic
     */
    getQuestions(req, res) {
        try {
            const { topicId } = req.params;
            const questions = academicModel.getQuestionsByTopic(topicId);

            if (!questions) {
                return res.status(404).json(
                    ResponseFormatter.error(`Topic '${topicId}' not found`, 404)
                );
            }

            // Also get context for breadcrumbs
            const context = academicModel.getTopicContext(topicId);

            res.json(ResponseFormatter.success(questions, {
                topicId,
                count: questions.length,
                context
            }));
        } catch (error) {
            console.error('Get questions error:', error);
            res.status(500).json(
                ResponseFormatter.error('Failed to fetch questions', 500, {
                    message: error.message
                })
            );
        }
    }
}

module.exports = new AcademicController();
