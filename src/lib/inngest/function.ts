// import { GoogleGenerativeAI } from "@google/generative-ai";
// import prisma from "../db";
// import { inngest } from "./client";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Create a function that can be triggered manually or via cron
// export const generateIndustryInsights = inngest.createFunction(
//   {
//     name: "Generate Industry Insights",
//     id: "career-coach",
//   },
//   // The second argument is the trigger definition
//   {
//     cron: "0 0 * * 0" , // Weekly on Sunday at midnight
//     event: "generate.insights",
//   },
//   // The third argument is the handler function
//   async ({ event, step }) => {
//     console.log("Starting industry insights generation");

//     try {
//       // Step 1: Fetch industries
//       const industryData = await step.run("Fetch Industries", async () => {
//         const data = await prisma.industryInsight.findMany({
//           select: { id: true, industry: true },
//         });
//         console.log(`Fetched ${data.length} industry records`);
//         return data;
//       });

//       if (!industryData || industryData.length === 0) {
//         console.log("No industry data found in database");
//         return { success: false, error: "No industry data found" };
//       }

//       // Step 2: Process each industry record
//       const results = [];

//       for (const item of industryData) {
//         console.log(`Processing record with ID: ${item.id}`);

//         // Validate industry data
//         if (
//           !item.industry ||
//           !Array.isArray(item.industry) ||
//           item.industry.length === 0
//         ) {
//           console.error(`Invalid industry array for record ${item.id}`);
//           results.push({
//             id: item.id,
//             status: "skipped",
//             reason: "invalid industry data",
//           });
//           continue;
//         }

//         // Process the first industry in the array
//         const industryName = item.industry[0];
//         console.log(`Processing industry: ${industryName}`);

//         try {
//           // Generate insights using AI
//           const prompt = `
//             Analyze the current state of the ${industryName} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
//             {
//               "salaryRanges": [
//                 { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
//               ],
//               "growthRate": number,
//               "demandLevel": "HIGH" | "MEDIUM" | "LOW",
//               "topSkills": ["skill1", "skill2"],
//               "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
//               "keyTrends": ["trend1", "trend2"],
//               "recommendedSkills": ["skill1", "skill2"]
//             }
            
//             IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
//             Include at least 5 common roles for salary ranges.
//             Growth rate should be a percentage.
//             Include at least 5 skills and trends.
//           `;

//           const aiResponse = await step.run(
//             `Generate insights for ${industryName}`,
//             async () => {
//               try {
//                 const res = await model.generateContent(prompt);
//                 return res;
//               } catch (aiError) {
//                 console.error(
//                   `AI generation failed for ${industryName}:`,
//                   aiError
//                 );
//                 if (aiError instanceof Error) {
//                   throw new Error(`AI generation failed: ${aiError.message}`);
//                 } else {
//                   throw new Error("AI generation failed with an unknown error");
//                 }
//               }
//             }
//           );

//           // Process AI response
//           const part =
//             aiResponse?.response?.candidates?.[0]?.content?.parts?.[0];
//           if (!part || !("text" in part)) {
//             throw new Error("Invalid AI response structure");
//           }

//           const text = part.text;
//           const insights = text.replace(/```(?:json)?\n?/g, "").trim();

//           if (!insights) {
//             throw new Error("Empty AI response");
//           }

//           // Parse the JSON response
//           const parsedInsights = JSON.parse(insights);

//           // Update the database
//           await step.run(`Update ${industryName} insights`, async () => {
//             const updateResult = await prisma.industryInsight.update({
//               where: { id: item.id },
//               data: {
//                 salaryRanges: parsedInsights.salaryRanges,
//                 growthRate: parsedInsights.growthRate,
//                 demandLevel: parsedInsights.demandLevel,
//                 topSkills: parsedInsights.topSkills,
//                 marketOutlook: parsedInsights.marketOutlook,
//                 keyTrends: parsedInsights.keyTrends,
//                 recommendedSkills: parsedInsights.recommendedSkills,
//                 lastUpdate: new Date(),
//                 nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//               },
//             });
//             return updateResult;
//           });

//           results.push({
//             id: item.id,
//             industry: industryName,
//             status: "success",
//           });
//         } catch (error) {
//           let e = error;
//           if (error instanceof Error) {
//             e = error;
//           }
//           console.error(
//             `Processing failed for industry ${industryName}:`,
//             error
//           );
//           results.push({
//             id: item.id,
//             industry: industryName,
//             status: "failed",
//             error: e.message,
//           });
//         }
//       }

//       return {
//         success: true,
//         processed: industryData.length,
//         results: results,
//       };
//     } catch (error) {
//       console.error("Function execution failed:", error);
//       if (error instanceof Error) {
//         throw new Error(`AI generation failed: ${error.message}`);
//       } else {
//         throw new Error("AI generation failed with an unknown error");
//       }
//     }
//   }
// );

// // Helper function to trigger the insights generation manually
// export const triggerInsightsGeneration = () => {
//   return inngest.send({
//     name: "generate.insights",
//     data: {
//       manual: true,
//       timestamp: new Date().toISOString(),
//     },
//   });
// };
