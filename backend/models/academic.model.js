/**
 * Academic Model
 * Data access layer for academic hierarchy
 */

const academicData = require('../data/academic.data');

class AcademicModel {
    /**
     * Get all available courses
     * @returns {Array} List of courses with basic info
     */
    getAllCourses() {
        return academicData.map(courseData => ({
            course: courseData.course,
            description: courseData.description
        }));
    }

    /**
     * Get years available for a specific course
     * @param {string} courseName - Name of the course
     * @returns {Array|null} List of years or null if course not found
     */
    getYearsByCourse(courseName) {
        const courseData = academicData.find(c => c.course === courseName);
        if (!courseData) return null;

        return courseData.years.map(yearData => ({
            year: yearData.year
        }));
    }

    /**
     * Get subjects for a specific course and year
     * @param {string} courseName - Name of the course
     * @param {number} year - Year number
     * @returns {Array|null} List of subjects or null if not found
     */
    getSubjectsByYear(courseName, year) {
        const courseData = academicData.find(c => c.course === courseName);
        if (!courseData) return null;

        const yearData = courseData.years.find(y => y.year === parseInt(year));
        if (!yearData) return null;

        return yearData.subjects.map(subject => ({
            id: subject.id,
            name: subject.name,
            description: subject.description,
            icon: subject.icon,
            topicCount: subject.topics.length
        }));
    }

    /**
     * Get topics for a specific subject
     * @param {string} subjectId - ID of the subject
     * @returns {Array|null} List of topics or null if not found
     */
    getTopicsBySubject(subjectId) {
        for (const course of academicData) {
            for (const year of course.years) {
                const subject = year.subjects.find(s => s.id === subjectId);
                if (subject) {
                    return subject.topics.map(topic => ({
                        id: topic.id,
                        name: topic.name,
                        description: topic.description,
                        icon: topic.icon,
                        questionCount: topic.questions.length
                    }));
                }
            }
        }
        return null;
    }

    /**
     * Get questions for a specific topic
     * @param {string} topicId - ID of the topic
     * @returns {Array|null} List of questions or null if not found
     */
    getQuestionsByTopic(topicId) {
        for (const course of academicData) {
            for (const year of course.years) {
                for (const subject of year.subjects) {
                    const topic = subject.topics.find(t => t.id === topicId);
                    if (topic) {
                        return topic.questions;
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get a specific question by ID
     * @param {string} questionId - ID of the question
     * @returns {Object|null} Question object or null if not found
     */
    getQuestionById(questionId) {
        for (const course of academicData) {
            for (const year of course.years) {
                for (const subject of year.subjects) {
                    for (const topic of subject.topics) {
                        const question = topic.questions.find(q => q.id === questionId);
                        if (question) {
                            return question;
                        }
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get full academic context for a topic (for breadcrumbs)
     * @param {string} topicId - ID of the topic
     * @returns {Object|null} Context object with course, year, subject, topic
     */
    getTopicContext(topicId) {
        for (const course of academicData) {
            for (const year of course.years) {
                for (const subject of year.subjects) {
                    const topic = subject.topics.find(t => t.id === topicId);
                    if (topic) {
                        return {
                            course: course.course,
                            year: year.year,
                            subject: {
                                id: subject.id,
                                name: subject.name
                            },
                            topic: {
                                id: topic.id,
                                name: topic.name
                            }
                        };
                    }
                }
            }
        }
        return null;
    }
}

module.exports = new AcademicModel();
