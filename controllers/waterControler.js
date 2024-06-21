import { errorHelper } from "../helpers/errorHelper.js";
import waterModel from "../models/water.js";

const addWaterServing = async (req, res, next) => {
  try {
    const response = await waterModel.create({ ...req.body });

    res.send({ data: response });
  } catch (error) {
    next(errorHelper(error));
  }
};
// ID користувача в req.body з'являється в мідлварі для перевірки токена
const editWaterServing = async (req, res, next) => {
  try {
    const oldData = await waterModel.findOne({
      _id: req.params._id,
      owner_id: req.body.owner_id,
    });
    if (oldData.amount === req.body.amount) {
      return res.send({ data: oldData });
    } else {
      const response = await waterModel.findByIdAndUpdate(
        oldData._id,
        {
          amount: req.body.amount,
        },
        { new: true }
      );
      res.send({ data: response });
    }
  } catch (error) {
    next(errorHelper(error));
  }
};

const deleteWaterServing = async (req, res, next) => {
  try {
    const response = await waterModel.findOneAndDelete({
      _id: req.params._id,
      owner_id: req.body.owner_id,
    });
    console.log(response);
    if (response === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(errorHelper(error));
  }
};

const waterServices = { addWaterServing, editWaterServing, deleteWaterServing };
export default waterServices;
