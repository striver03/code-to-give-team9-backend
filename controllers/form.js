const {writeFileSync} = require('fs')

const { FormDao, Form } = require("../models/form");
const { FormDoesNotExistError } = require("../models/errors/form");

const getForm = (req, res, _next) => {
    const { id } = req.query;

    if (id == undefined) {
        res.status(400).json({
        error: "Missing form id",
        });
        return;
    }

    FormDao.getForm(id)
        .then((form) => {
        res.json(form.json());
        })
        .catch((err) => {
        if (err instanceof FormDoesNotExistError) {
            res.status(404).json({
            error: "Form does not exist",
            });
        }
    });
};

const createForm = (req, res, _next) => {
    const { name, createdBy } = req.body;

    try {
      const form = new Form({
        name: name,
        createdBy: createdBy,
      });

      FormDao.createForm(form)
        .then((form) => {
          writeFileSync('./local/formID.txt', form.id);
          res.json(form.json());
        })
        .catch((_err) => {
          console.log(_err);
          res.status(500).json({
            error: "Failed to create form",
          });
        });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }

module.exports = {getForm, createForm};