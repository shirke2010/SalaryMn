const express = require("express");
const mongoose = require("mongoose");
const BasicSalary = require("./models/BasicSalaryModel");
const OtherHeads = require("./models/OtherHeadsModel");
const SalaryTransaction = require("./models/SalaryTransactionModel");
const Employee = require("./models/EmployeeModel");
const SalaryTransBreakUp = require("./models/SalaryTransBreakUpModel");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// This is for, not to conflict Angular port (4200) and mongodb post (5000) when run togarter (middleware to your NodeJS/Express app)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  //res.setHeader('Access-Control=Allow-Headers','Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.urlencoded({ extended: false })); //middleware - to updae immediately

//routes
app.get("/", (req, res) => {
  res.send("Hellow SM");
});

// save basic Salary
app.post("/basicSalary", async (req, res) => {
  try {
    const basicSalary = await BasicSalary.create(req.body);
    res.status(200).json(basicSalary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// save other heads
app.post("/otherHeads", async (req, res) => {
  try {
    const otherHeads = await OtherHeads.create(req.body);
    res.status(200).json(otherHeads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/salaryTransaction", async (req, res) => {
  try {
    let obj = req.body;
        
    const st = {
      employeeId:obj.employeeId,
      date:obj.date,
      forMonth:obj.forMonth,
      forYear:obj.forYear,
      amount:obj.amount,
      modeOfPayment:obj.modeOfPayment,
      transactionRef:obj.transactionRef,
      presentDays:obj.presentDays,
      basicSalary:obj.basicSalary,
      calculatedBasicAmount:obj.calculatedBasicAmount
    }
        
    const salaryTransaction = await SalaryTransaction.create(st);
   
    res.status(200).json(salaryTransaction);
    var insertedId = salaryTransaction._id;

    obj.earning.forEach((element) => {
      element.stId = insertedId
    });

    obj.deduction.forEach((element) => {
      element.stId = insertedId
    });

    for (let i = 0; i < obj.earning.length; i++) {
      const salaryTransBreakUp = new SalaryTransBreakUp(obj.earning[i]);
      salaryTransBreakUp.save({
      });
    }

    for (let i = 0; i < obj.deduction.length; i++) {
      const salaryTransBreakUp = new SalaryTransBreakUp(obj.deduction[i]);
      salaryTransBreakUp.save({
      });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Save employee
app.post("/employee", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------------------

// Get all basic salary
// app.get('/basicSalary',async(req,res)=>{
//     try{
//         const basicSalary = await BasicSalary.find({});
//         res.status(200).json(basicSalary)
//     }catch(error){
//         console.log(error.message);
//         res.status(500).json({message:error.message})
//     }
// })

app.get("/basicSalary", async (req, res) => {
  try {
    const basicSalary = await BasicSalary.aggregate([
      {
        $lookup: {
          from: "employees", //use table name in db with 's'
          localField: "employeeId",
          foreignField: "_id",
          as: "ED",
        },
      },
    ]);
    res.status(200).json(basicSalary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all other heads
app.get("/otherHeads", async (req, res) => {
  try {
    const otherHeads = await OtherHeads.find({});
    res.status(200).json(otherHeads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all salary transaction
app.get("/salaryTransaction", async (req, res) => {
  try {
    const salaryTransaction = await SalaryTransaction.find({});
    res.status(200).json(salaryTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all salary transBreakUp
app.get("/salaryTransBreakUp", async (req, res) => {
  try {
    const salaryTransBreakUp = await SalaryTransBreakUp.find({});
    res.status(200).json(salaryTransBreakUp);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all employee
app.get("/employee", async (req, res) => {
  try {
    const employee = await Employee.find({});
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------------------

// Get specific basic salary
app.get("/basicSalary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const basicSalary = await BasicSalary.findById(id);
    res.status(200).json(basicSalary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get specific other heads
app.get("/otherHeads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const otherHeads = await OtherHeads.findById(id);
    res.status(200).json(otherHeads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get specific salary transaction
app.get("/salaryTransaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const salaryTransaction = await SalaryTransaction.findById(id);
    res.status(200).json(salaryTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get specific salary transBreakUp
app.get("/salaryTransBreakUp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const salaryTransBreakUp = await SalaryTransBreakUp.findById(id);
    res.status(200).json(salaryTransBreakUp);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get specific employee
app.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------------------

// update specific basic salary
app.put("/basicSalary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const basicSalary = await BasicSalary.findByIdAndUpdate(id, req.body);
    if (!basicSalary) {
      return req
        .status(404)
        .json({ message: "Can not find basic salary with id${id}" });
    }
    const updateBasicSalary = await BasicSalary.findById(id);
    res.status(200).json(updateBasicSalary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update specific other heads
app.put("/otherHeads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const otherHeads = await OtherHeads.findByIdAndUpdate(id, req.body);
    if (!otherHeads) {
      return req
        .status(404)
        .json({ message: "Can not find other head with id${id}" });
    }
    const updateOtherHeads = await OtherHeads.findById(id);
    res.status(200).json(updateOtherHeads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update specific salary transaction
app.put("/salaryTransaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const salaryTransaction = await SalaryTransaction.findByIdAndUpdate(id,req.body);
    if (!salaryTransaction) {
      return req
        .status(404)
        .json({ message: "Can not find salary transaction with id${id}" });
    }
    const updateSalaryTransaction = await SalaryTransaction.findById(id);
    res.status(200).json(updateSalaryTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update specific employee
app.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body);
    //we can't find record in db
    if (!employee) {
      return req
        .status(404)
        .json({ message: "Can not find any employee with id${id}" });
    }
    const updatedEmployee = await Employee.findById(id); // to get updated value
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------------------

// delete specific basic salary
app.delete("/basicSalary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const basicSalary = await BasicSalary.findByIdAndDelete(id);
    if (!basicSalary) {
      return res
        .status(404)
        .json({ message: "Can not find any basic salary by id ${id}" });
    }
    res.status(200).json(basicSalary);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete specific other head
app.delete("/otherHeads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const otherHeads = await OtherHeads.findByIdAndDelete(id);
    if (!otherHeads) {
      return res
        .status(404)
        .json({ message: "Can not find any other head by id ${id}" });
    }
    res.status(200).json(otherHeads);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete specific salary transaction
app.delete("/salaryTransaction/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const salaryTransaction = await SalaryTransaction.findByIdAndDelete(id);
    // app.collection("salaryTransBreakUp").deleteMany({ stId: id });
        
    if (!salaryTransaction) {
      return res
        .status(404)
        .json({ message: "Can not find any salary transaction by id ${id}" });
    }
    res.status(200).json(salaryTransaction);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete specific salary transaction break up
app.delete("/salaryTransBreakUp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const salaryTransBreakUp = await SalaryTransBreakUp.findByIdAndDelete(id);
    if (!salaryTransBreakUp) {
      return res
        .status(404)
        .json({ message: "Can not find any salary transaction by id ${id}" });
    }
    res.status(200).json(salaryTransBreakUp);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete specific employee
app.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    //We can't find record in db
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Can not find any employee with id ${id}" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//-------------------------------------------------

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://shirkerk:Qq3VoZolxKyORrxP@cluster0.tfumzbd.mongodb.net/SM?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(5000, () => {
      console.log("Salary app is running on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
