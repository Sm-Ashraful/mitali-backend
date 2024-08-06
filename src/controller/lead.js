const axios = require("axios");
const lead = require("../models/lead");
const xml2js = require("xml2js");
const parse = require("json5");

const zipCode = require("../lib/zipCodeSecond.json");

exports.leadSubmit = async (req, res) => {
  const existingUser = await lead.findOne({
    PhoneNumber: req.body.PhoneNumber.toString(),
  });

  if (existingUser) {
    return res.status(201).json({
      message: "Entry already in Database",
    });
  }
  const isValid = zipCode.some(
    (code) => code.Zip.toString() === req.body.ZipCode.toString()
  );
  if (!isValid) {
    return res.status(401).json({
      message: "The zip does not exists on the list. Invalid Zip code",
    });
  }

  try {
    const {
      ZipCode,
      State,
      Address,
      FirstName,
      LastName,
      City,
      PhoneNumber,
      EmailAddress,
      DateOfBirth,
    } = req.body;

    if (
      !ZipCode |
      !State |
      !Address |
      !FirstName |
      !LastName |
      !City |
      !PhoneNumber |
      !EmailAddress |
      !DateOfBirth
    ) {
      return res.status(400).json({
        success: false,
        message: "ContactData is required in the request body",
      });
    }

    const leadData = {
      ApiToken: "7DB7F8FA-7F57-46A8-A494-187C9672ED14",
      Vertical: "Medicare",
      SubId: "12386",

      UserAgent:
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
      OriginalUrl: "https://www.mitaliint.com",
      Source: "Social",
      JornayaLeadId: "",
      TrustedForm: "",
      SessionLength: "38",
      TcpaText:
        "By clicking Get My Quotes, I agree to the Terms of Service and Privacy Policy and authorize insurance companies, their agents and marketing partners to contact me about medicare insurance and other non-insurance offers by telephone calls, email and text messages to the number and email address I provided above. I agree to receive telemarketing calls, and pre-recorded messages via an autodialed phone system, even if my telephone number is a mobile number that is currently listed on any state, federal or corporate “Do Not Call” list. I understand that my consent is not a condition of purchase of any goods or services and that standard message and data rates may apply.",

      FirstTimeBuyer: "Yes",
      SiteLicenseNumber: "",
      ContactData: {
        ZipCode: ZipCode,
        State: State,
        Address: Address,
        FirstName: FirstName,
        LastName: LastName,
        City: City,
        PhoneNumber: PhoneNumber,
        EmailAddress: EmailAddress,
        DayPhoneNumber: "",
        IpAddress: "255.255.255.127",
      },
      Person: {
        BirthDate: DateOfBirth,
        Gender: "Male",
        RelationshipToApplicant: "Self",
        HouseHoldIncome: "$30,000 - $44,999",
        HouseHoldSize: "5",
        Product: "(MS) Medicare Supplement",
        MaritalStatus: "Single",
        DeniedInsurance: "No",
        USResidence: "True",
        Height_FT: "5",
        Height_Inch: "9",
        Weight: "165",
        Student: "False",
        Occupation: "Employeed",
        Education: "Bachelors Degree",
        HasMedicareCard: "No",
        EligibleDisability: "No",
        Conditions: {
          HighCholesterol: "No",
          PulmonaryDisease: "No",
          VascularDisease: "No",
          AIDSHIV: "No",
          KidneyDisease: "No",
          Asthma: "No",
          Cancer: "No",
          Depression: "No",
          Diabetes: "No",
          HeartDisease: "No",
          LiverDisease: "No",
          HighBloodPressure: "No",
          MentalIllness: "No",
          Stroke: "No",
          Alzheimer: "No",
          AlcoholAbuse: "No",
        },
        MedicalHistory: {
          Hospitalized: "No",
          Pregnant: "No",
          Smoker: "No",
          Alcoholabstain: "No",
        },
      },
    };

    // Make a request to the Medicare API
    const xmlResponse = await axios.post(
      "https://leadapi.px.com/api/lead/directpost",
      leadData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (xmlResponse.status === 200) {
      const parsedXML = await xml2js.parseStringPromise(xmlResponse.data, {
        explicitArray: false,
      });
      const jsonData = JSON.stringify(parsedXML, null, 2);
      const result = JSON.parse(jsonData);
      if (result.Result.Success === "true") {
        const leadDataForPanel = {
          ZipCode,
          State,
          Address,
          FirstName,
          LastName,
          City,
          PhoneNumber,
          EmailAddress,
          DateOfBirth,
          TransactionId: result.Result.TransactionId,
        };
        const _newleadData = new lead(leadDataForPanel);
        _newleadData.save();

        res.status(200).json({
          success: true,
          message: "Lead submitted successfully",
          data: result.Result, // Extracting the data property from the response
        });
      } else {
        res.status(201).json({
          success: false,
          message: result.Result.Message,
          data: result.Result,
        });
      }
    } else {
      res.status(400).json({ message: "Information Invalid" });
    }
    res.status(200).json({ message: "done" });
    //backend instance
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        success: false,
        message: "API error",
        data: error.response.data,
      });
    } else {
      console.error("Error:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};
exports.getLeadData = async (req, res) => {
  lead
    .find({})
    .then((data) => {
      return res.status(201).json({ data });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
