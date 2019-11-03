import Students from "../models/Students";

class StudentController {
  async store(req, res) {
    const studentExists = await Students.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const student = await Students.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.body;

    const student = await Students.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: "Student doesn't exist" });
    }

    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({ name, email, age, weight, height });
  }
}

export default new StudentController();
