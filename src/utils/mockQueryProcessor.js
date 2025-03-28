// Simulating AI-powered query processing
export const mockQueryProcessing = async (queryText) => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Comprehensive query results with different chart types
  const queryResults = [
    {
      pattern: /monthly sales revenue/i,
      exactMatch: true,
      chartType: "line",
      title: "Monthly Sales Revenue",
      data: [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 3000 },
        { month: "Mar", revenue: 5000 },
        { month: "Apr", revenue: 4500 },
        { month: "May", revenue: 6000 },
      ],
    },
    {
      pattern: /user cohorts/i,
      exactMatch: true,
      chartType: "bar",
      title: "User Cohort Distribution",
      data: [
        { cohort: "New Users", count: 500 },
        { cohort: "Active Users", count: 1200 },
        { cohort: "Churned Users", count: 300 },
        { cohort: "Returning Users", count: 800 },
      ],
    },
    {
      pattern: /performance/i,
      exactMatch: false,
      chartType: "bar",
      title: "Quarterly Performance Metrics",
      data: [
        { quarter: "Q1", performance: 85 },
        { quarter: "Q2", performance: 92 },
        { quarter: "Q3", performance: 88 },
        { quarter: "Q4", performance: 95 },
      ],
    },
    {
      pattern: /retention/i,
      exactMatch: false,
      chartType: "line",
      title: "Customer Retention Rates",
      data: [
        { month: "Month 1", rate: 95 },
        { month: "Month 2", rate: 80 },
        { month: "Month 3", rate: 70 },
        { month: "Month 4", rate: 65 },
        { month: "Month 5", rate: 60 },
      ],
    },
  ];

  // Find exact matches first
  const exactMatch = queryResults.find(
    (q) => q.exactMatch && q.pattern.test(queryText)
  );

  if (exactMatch) {
    return {
      query: queryText,
      type: exactMatch.chartType,
      title: exactMatch.title,
      data: exactMatch.data,
    };
  }

  // If no exact match, try partial matches
  const partialMatch = queryResults.find(
    (q) => !q.exactMatch && q.pattern.test(queryText)
  );

  if (partialMatch) {
    return {
      query: queryText,
      type: partialMatch.chartType,
      title: partialMatch.title,
      data: partialMatch.data,
    };
  }

  throw new Error("No data found");
};

// AI-powered query suggestions
export const suggestQueries = (inputText) => {
  const suggestions = [
    "Show monthly sales revenue",
    "Compare user cohorts",
    "Analyze customer retention",
    "Display quarterly performance",
  ];

  return suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputText.toLowerCase())
  );
};
