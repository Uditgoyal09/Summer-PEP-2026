import fs from 'fs/promises';

const coursesFilePath = './data/courses.json';

export const getCourses = async (req, res) => {
  try {
    const data = await fs.readFile(coursesFilePath, 'utf-8');
    const courses = data ? JSON.parse(data) : [];  //store or convert JSON into js Object to manuplate
    res.status(200).json(courses);
  } catch (error) {
    console.error(`Error reading ${coursesFilePath}:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const data = await fs.readFile(coursesFilePath, 'utf-8');
    const courses = data ? JSON.parse(data) : [];
    
    const newCourse = {id: Date.now(),  ...req.body };
    
    courses.push(newCourse);
    await fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2), 'utf-8');
    
    res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });
  } catch (error) {
    console.error(`Error in /courses POST:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
