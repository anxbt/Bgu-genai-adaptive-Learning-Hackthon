/**
 * Academic Routes
 * API endpoints for academic navigation (MVC)
 */

const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academic.controller');

/**
 * GET /api/courses
 * Get all available courses
 */
router.get('/courses', academicController.getCourses);

/**
 * GET /api/courses/:course/years
 * Get years for a specific course
 */
router.get('/courses/:course/years', academicController.getYears);

/**
 * GET /api/courses/:course/years/:year/subjects
 * Get subjects for a specific course and year
 */
router.get('/courses/:course/years/:year/subjects', academicController.getSubjects);

/**
 * GET /api/subjects/:subjectId/topics
 * Get topics for a specific subject
 */
router.get('/subjects/:subjectId/topics', academicController.getTopics);

/**
 * GET /api/topics/:topicId/questions
 * Get questions for a specific topic
 */
router.get('/topics/:topicId/questions', academicController.getQuestions);

module.exports = router;
