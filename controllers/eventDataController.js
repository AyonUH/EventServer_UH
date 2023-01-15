const eventData = require("./../model/eventSchema");
const {
  successResponse,
  failureResponse,
} = require("./../helpers/responseBody");

const addEventData = async (data) => {
  try {
    const dataWrite = JSON.parse(data);
    const arr = await eventData.find({ slug: dataWrite.slug });
    if (arr.length === 0) {
      const toWrite = new eventData(dataWrite);
      await toWrite.save();
      console.log("🟢 EVENT ADDED SUCCESSFULLY!! 🟢");
      return successResponse(
        "success",
        201,
        "🟢 DATA ADDED SUCCESSFULLY!! 🟢",
        dataWrite
      );
    } else {
      console.log("🟠 SAME EVENT ALREADY PRESENT!! 🟠");
      return failureResponse(
        "failure",
        400,
        "🟠 SAME EVENT ALREADY PRESENT!! 🟠"
      );
    }
  } catch (error) {
    console.error(error);
    return failureResponse("failure", 400, error);
  }
};

const fetchEventsData = async () => {
  try {
    const dataFetched = await eventData.find({}).sort({ event: 1 });
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

const findEventsData = async (field, keyword) => {
  try {
    let dataFetched = {};
    if (keyword.toLowerCase() === "true" || keyword.toLowerCase() === "false") {
      dataFetched = await eventData
        .find({ [field]: { $eq: keyword.toLowerCase() } })
        .sort({ event: 1 });
    } else {
      dataFetched = await eventData
        .find({ [field]: { $regex: keyword } })
        .sort({ event: 1 });
    }
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

const updateEventData = async (keyword, data) => {
  try {
    let updatedDoc = await eventData.findOneAndUpdate(
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

const deleteEventData = async (keyword) => {
  try {
    const docData = await eventData.deleteOne({ slug: keyword });
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
  addEventData,
  fetchEventsData,
  findEventsData,
  updateEventData,
  deleteEventData,
};
