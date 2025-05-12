import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    const salaryNumber = Number(salary);

    if (isNaN(salaryNumber)) {
      return res.status(400).json({
        message: "Please enter only numbers. Do not include 'LPA', 'K'.",
        success: false,
      });
    }

    if (salaryNumber <= 0) {
      return res.status(400).json({
        message: "Salary must be greater than 0.",
        success: false,
      });
    }
    const positionNumeber = Number(position);
    if (isNaN(positionNumeber)) {
      return res.status(400).json({
        message: "Position must be a number.",
        success: false,
      });
    }
    if (positionNumeber <= 0) {
      return res.status(400).json({
        message: "Position must be greater than 0.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found..",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const updateData = {};
    const { title, description, requirements, salary, location, jobType, experienceLevel, position } = req.body;
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (requirements) updateData.requirements = requirements.split(",");
    if (salary) updateData.salary = salary;
    if (location) updateData.location = location;
    if (jobType) updateData.jobType = jobType;
    if (experienceLevel) updateData.experienceLevel = experienceLevel;
    if (position) updateData.position = position;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No fields provided to update.",
        success: false,
      });
    }

    const job = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    
    return res.status(200).json({
      message: "Job updated successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
