const axios = require("axios");
exports.leadSubmit = async (req, res) => {
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
    } = req.body;

    if (
      !ZipCode |
      !State |
      !Address |
      !FirstName |
      !LastName |
      !City |
      !PhoneNumber |
      !EmailAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "ContactData is required in the request body",
      });
    }

    const leadData = {
      ApiToken: "D68FD1FD-AFC9-4F1F-820E-331BA7F78544",
      Vertical: "Medicare",
      SubId: "FB1",

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
        State: "AL",
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
        BirthDate: "1945-01-01",
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
    const apiResponse = await axios.post(
      "https://leadapi.px.com/api/lead/directpost",
      leadData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Lead submitted successfully",
      data: apiResponse.data, // Extracting the data property from the response
    });
  } catch (error) {
    if (error.response) {
      console.error("HTTP error:", error.response.status);
      console.error("Response data:", error.response.data);
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
