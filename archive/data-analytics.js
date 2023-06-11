// @ts-check
// const express = require("express");
import express from "express";
// const districts = require("../local/district-data");
// import districts from "../local/district-data.js";
const router = express.Router();
// const { FormSubmissionDao } = require("../models/form-submission");
import {FormSubmissionDao} from "../models/form-submission.js";

// const { mapToObject } = require("../utils/map");
import {mapToObject} from "../utils/map.js";

router.get("/dashboard", async (req, res) => {
  let { district } = req.query;

  // get all form submissions for this district
  const submissions = await FormSubmissionDao.find({ district });

  // Number of form submissions
  let numSubmissions = submissions.length;

  // Age Group Data
  let ageGroups = new Map();

  // for every discrete age, add to ageGroups
  submissions.forEach((submission) => {
    const { age } = submission;
    if (ageGroups.has(age)) {
      ageGroups.set(age, ageGroups.get(age) + 1);
    } else {
      ageGroups.set(age, 1);
    }
  });

  // Substance Abuse Data
  // make every substance_abuse response unique and sorted
  let substanceAbuseCounts = new Map();
  submissions.forEach((submission) => {
    let uniqueS = new Set(submission.substance_used);
    let uniqueSArray = Array.from(uniqueS);
    let sorted = uniqueSArray.sort();

    let key = sorted.join(", ");

    if (substanceAbuseCounts.has(key)) {
      substanceAbuseCounts.set(key, substanceAbuseCounts.get(key) + 1);
    } else {
      substanceAbuseCounts.set(key, 1);
    }
  });

  // Stress Data
  let stressCounts = new Map();
  let totalStress = 0;
  submissions.forEach((submission) => {
    let stress = Number(submission.stress_level);
    totalStress += stress;
    if (stressCounts.has(stress)) {
      stressCounts.set(stress, stressCounts.get(stress) + 1);
    } else {
      stressCounts.set(stress, 1);
    }
  });
  let avgStress = totalStress / numSubmissions;

  res.json({
    count: submissions.length,
    district: district || "All",
    ageGroups: mapToObject(ageGroups),
    substanceAbuseCounts: mapToObject(substanceAbuseCounts),
    stressCounts: mapToObject(stressCounts),
    avgStress,
  });
});

// module.exports = router;
export default router;
