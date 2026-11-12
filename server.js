import express from "express";

//creating my express app
const app = express();

//middleware
app.use(express.json());

//declare my port
const PORT = 5001;

let employees = [
  {
    id: 1,
    name: "John Doe",
    age: 25,
    department: "Engineering",
    salary: 150000,
    position: "Frontend Developer",
  },

  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    department: "Marketing",
    salary: 120000,
    position: "Marketing Manager",
  },
];

//lifeless check
app.get("/", (req, res) => {
  res.end("Lifeless check complete");
});


//get all employees
app.get("/api/employees", (req, res) => {
  res.status(200).json({
    message: "Employees retrieved successfully",
    employees: employees,
  });
});


//get an employee by id
app.get("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  const employee = employees.find((employee) => employee.id === id);

  if (!employee) {
    return res.status(404).json({
      message: `Employee with id:${id} not found`,
    });
  }

  res.status(200).json({
    message: `Employee with id:${id} retrieved successfully`,
    employee: employee,
  });
});


//create employee/post
app.post("/api/employees", (req, res) => {
  const { name, age, department, salary, position } = req.body;

  const newEmployee = {
    id: Date.now(),
    name,
    age,
    department,
    salary,
    position,
  };

  employees.push(newEmployee);

  //   console.log(employees)
  res.status(201).json({
    message: "Employee created successfully",
    employee: newEmployee,
  });
});


//Edit employee/patch
app.patch("/api/employees/:id", (req, res) => {
  const editingId = Number(req.params.id);

  const employeeIndex = employees.findIndex(
    (employee) => employee.id === editingId,
  );


   // Check if employee exists
  if (employeeIndex === -1) {
    return res.status(404).json({
      message: `Employee with id:${editingId} not found`,
    });
  }

  //update employee
  employees[employeeIndex] = {
    ...employees[employeeIndex],
    ...req.body,
  };

  res.status(200).json({
    message: "Employee updated successfully",
    employee: employees[employeeIndex],
  });
});

//Delete employee
app.delete("/api/employees/:id", (req, res) => {
  const deleteId = Number(req.params.id);

  const employee = employees.find((employee) => employee.id === deleteId);

  //validate if not employee
  if (!employee) {
    return res.status(404).json({
      message: `Employee with id:${deleteId} not found`,
    });
  }

  employees = employees.filter((employee) => employee.id !== deleteId);

  res.status(200).json({
    message: "Employee deleted successfully",
    employee: employee,
  });
});

app.listen(PORT, () => {
  console.log(`Server started running on ${PORT}`);
});
