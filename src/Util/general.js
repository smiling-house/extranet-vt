import moment from "moment";
import countryList from "../Util/data/countries.json";
import OpenAI from "openai";

  const openai = new OpenAI({
    apiKey: 'sk-bcIta3RH1pbT-3gI3paTOL-a9kJOBvvFG7V2c20XqAT3BlbkFJLmXPW-OAbndQnn5B8kya3ae4aY6AVLRu0E59rpdCcA',
    organization: "org-vLDbTnoXHQHu7bgkVTWTfr2P",
    project: "proj_7arKzumGh222PLgK03D3WatQ",
    dangerouslyAllowBrowser: true
  });
  
  export async function AI(input, wordCount, exclude) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: 'rewrite in '+wordCount+' words exluding the words "'+exclude+': '+input }],
      model: "gpt-4o",
    }).then (
      console.log('DONE')
    )
    //console.log('AI TEXT REWRITE FOR :',input,'are:', completion?.choices[0]?.message?.content)
    return (completion?.choices[0]?.message?.content)
  }
    

export const isNullOrEmpty = (value) => {
  return value == null || value === "";
};

export const isNullOrEmptyArray = (arr) => {
  return arr == null || arr.length === 0;
};
export function getStorageValue  (key) {
  return localStorage.getItem(key);
};
export const calculateTotalNights = () => {
  return moment(getStorageValue("dateTo")).diff(
    getStorageValue("dateFrom"),
    "days"
  );
};

export const detectCurrency = (currency) => {
  const data = countryList?.filter(
    (curr) => curr?.currency?.code === currency
  )[0];
  return data?.currency?.symbol;
};

export const isPercentageOrAmount = (value, currency) => {
  return value === "FIXED" ? detectCurrency(currency) : "%";
};

export const countWeekendDays = (
  startDate = new Date(localStorage.getItem("dateFrom")),
  endDate = new Date(localStorage.getItem("dateTo")),
  weekendDays = []
) => {
  let numWeekendDays = 0;
  let currentDate = new Date(startDate.getTime());

  // Loop over each day from start date to end date
  while (currentDate <= endDate) {
    // Check if current day is Friday or Saturday
    if (
      currentDate.getDay() === (weekendDays[0] || 5) ||
      currentDate.getDay() === (weekendDays[1] || 6)
    ) {
      numWeekendDays++;
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return numWeekendDays;
};

export const isPercentage = (value) => {
  return value === "PERCENTAGE";
};
