import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../db";
import { inngest } from "./client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights", id: "career-coach" },
  { cron: "0 0 * * 0" },

  async ({ event, step }) => {
    try {
      const industryData = await step.run("Fetch Industries", async () => {
        return prisma.industryInsight.findMany({
          select: { id: true, industry: true },
        });
      });

      console.log("Industries fetched:", industryData);

      for (const item of industryData) {
        // Validate industry before proceeding
        if (
          !item.industry ||
          !Array.isArray(item.industry) ||
          item.industry.length === 0
        ) {
          console.error(`Invalid industry array for record ${item.id}`);
          continue; // Skip this iteration
        }

        // Process each industry in the array
        for (const industryName of item.industry) {
          if (!industryName || typeof industryName !== "string") {
            console.error(`Invalid industry name in record ${item.id}`);
            continue;
          }

          const prompt = `
            Analyze the current state of the ${industryName} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
            {
              "salaryRanges": [
                { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
              ],
              "growthRate": number,
              "demandLevel": "HIGH" | "MEDIUM" | "LOW",
              "topSkills": ["skill1", "skill2"],
              "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
              "keyTrends": ["trend1", "trend2"],
              "recommendedSkills": ["skill1", "skill2"]
            }
            
            IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
            Include at least 5 common roles for salary ranges.
            Growth rate should be a percentage.
            Include at least 5 skills and trends.
          `;

          try {
            const res = await step.ai.wrap(
              "gemini",
              async (p) => {
                return await model.generateContent(p);
              },
              prompt
            );

            if (!res?.response?.candidates?.[0]?.content?.parts?.[0]) {
              console.error(
                `Empty or invalid AI response for industry: ${industryName}`
              );
              continue;
            }

            const part = res.response.candidates[0].content.parts[0];
            const text = part && "text" in part ? part.text : "";
            const insights = text.replace(/```(?:json)?\n?/g, "").trim();

            if (!insights) {
              console.error(
                `AI response is empty for industry: ${industryName}`
              );
              continue;
            }

            let parsedInsights;
            try {
              parsedInsights = JSON.parse(insights);
            } catch (error) {
              console.error(
                `Failed to parse AI response for ${industryName}:`,
                error
              );
              continue;
            }

            await step.run(`Update ${industryName} insights`, async () => {
              return await prisma.industryInsight.update({
                where: {
                  id: item.id, // Use the unique ID instead of trying to match on the array
                },
                data: {
                  salaryRanges: parsedInsights.salaryRanges,
                  growthRate: parsedInsights.growthRate,
                  demandLevel: parsedInsights.demandLevel,
                  topSkills: parsedInsights.topSkills,
                  marketOutlook: parsedInsights.marketOutlook,
                  keyTrends: parsedInsights.keyTrends,
                  recommendedSkills: parsedInsights.recommendedSkills,
                  lastUpdate: new Date(),
                  nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                },
              });
            });
          } catch (error) {
            console.error(`Error processing industry ${industryName}:`, error);
            // Continue with the next industry instead of failing completely
          }
        }
      }

      return { success: true, processedCount: industryData.length };
    } catch (error) {
      console.error("Function execution failed:", error);
      return { success: false, error: error.message };
    }
  }
);
