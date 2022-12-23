const genericProp = require("../model/genericProperty");
const {
  successResponse,
  failureResponse,
} = require("./../helpers/responseBody");

const addGenericProperty = async (data) => {
  try {
    const dataWrite = JSON.parse(data);
    const arr = await genericProp.find({ slug: dataWrite.slug });
    if (arr.length === 0) {
      const toWrite = new genericProp(dataWrite);
      await toWrite.save();
      console.log("🟢 DATA ADDED SUCCESSFULLY!! 🟢");
      return successResponse(
        "success",
        201,
        "🟢 DATA ADDED SUCCESSFULLY!! 🟢",
        dataWrite
      );
    } else {
      console.log("🟠 SAME PROPERTY ALREADY PRESENT!! 🟠");
      return failureResponse(
        "failure",
        400,
        "🟠 SAME PROPERTY ALREADY PRESENT!! 🟠"
      );
    }
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 400, error);
  }
};

const fetchGenericProperties = async () => {
  try {
    const dataFetched = await genericProp.find({}).sort({ property: 1 });
    console.log("🟢 DATA FETCHED SUCCESSFULLY!! 🟢");
    return successResponse(
      "success",
      200,
      "🟢 DATA FETCHED SUCCESSFULLY!! 🟢",
      dataFetched
    );
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 400, error);
  }
};

const findGenericProperties = async (field, keyword) => {
  try {
    const dataFetched = await genericProp
      .find({ [field]: { $regex: keyword } })
      .sort({ property: 1 });
    if (dataFetched.length === 0) {
      console.log("🟣 NO MATCHING RESULTS FOUND!!! 🟣");
      return successResponse(
        "success",
        200,
        "🟣 NO MATCHING RESULTS FOUND!!! 🟣",
        dataFetched
      );
    }
    return successResponse(
      "success",
      200,
      "🟣 SEARCH QUERY EXECUTED SUCCESSFULLY !! 🟣",
      dataFetched
    );
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 400, error);
  }
};

const updateGenericProperty = async (keyword, data) => {
  try {
    let updatedDoc = await genericProp.findOneAndUpdate(
      { slug: keyword },
      data,

      { upsert: true, setDefaultsOnInsert: true, new: true }
    );
    console.log("🟡 DATA UPDATED SUCCESSFULLY!! 🟡");
    return successResponse(
      "success",
      200,
      "🟡 DATA UPDATED SUCCESSFULLY!! 🟡",
      updatedDoc
    );
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 400, error);
  }
};

const deleteGenericProperty = async (keyword) => {
  try {
    const docData = await genericProp.deleteOne({ slug: keyword });
    if (docData.deletedCount > 0) {
      console.log("🔴 DOCUMENT DELETED SUCESSFULLY!! 🔴");
      return successResponse(
        "success",
        204,
        "🔴 DOCUMENT DELETED SUCESSFULLY!! 🔴",
        []
      );
    }
    console.log("⭕ NO DOC FOUND TO BE DELETED!! ⭕");
    return successResponse(
      "success",
      204,
      "⭕ NO DOC FOUND TO BE DELETED!! ⭕",
      []
    );
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 404, error);
  }
};

module.exports = {
  addGenericProperty,
  fetchGenericProperties,
  findGenericProperties,
  updateGenericProperty,
  deleteGenericProperty,
};
