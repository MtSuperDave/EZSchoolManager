const StudentCourseService = require('./student_course.service');

class StudentCourseController {
    constructor() {
        this.studentCourseService = new StudentCourseService();
    }

    createStudentCourse= async (req, res) => {
        try {
            const studentCourseDetails = req.body;
            await this.studentCourseService.createStudentCourse(studentCourseDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating StudentCourse' });
        }
    } 

    updateStudentCourse= async (req, res) => {
        try {
            const studentCourseId = req.params.studentCourseId
            const CourseStudentDetails = req.body;
            await this.studentCourseService.updateStudentCourse(CourseStudentDetails, studentCourseId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating StudentCourse' });
        }
    } 

    deleteStudentCourse= async (req, res) => {
        try {
            const studentCourseId = req.params.studentCourseId
            await this.studentCourseService.deleteStudentCourse(studentCourseId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating StudentCourse' });
        }
    } 

    retrieveAllStudentCourses= async (req, res) => {
        try {
            const studentCourseDetails = req.body;
            const result = await this.studentCourseService.retrieveAllStudentCourses(studentCourseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all StudentCourse' });
        }
    }


    retrieveStudentCoursesFiltered= async (req, res) => {
        try {
            const studentCourseDetails = req.query;
            const result = await this.studentCourseService.retrieveStudentCoursesFiltered(studentCourseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving filtered StudentCourse' });
        }
    }

    countStudentCourses= async (req, res) => {
        try {
            const studentCourseDetails = req.query;
            const result = await this.studentCourseService.countStudentCourses(studentCourseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving count of filteredStudentCourse' });
        }
    }

    retrieveStudentCoursesByStudentId= async (req, res) => {
        try {
            const studentCourseDetails = req.query;
            const result = await this.studentCourseService.retrieveStudentCoursesByStudentId(studentCourseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving StudentCourse' });
        }
    }

    retrieveStudentCoursesByCourseId= async (req, res) => {
        try {
            const studentCourseDetails = req.query;
            const result = await this.studentCourseService.retrieveStudentCoursesByCourseId(studentCourseDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving StudentCourse' });
        }
    }
}

module.exports = StudentCourseController;
