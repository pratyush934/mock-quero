import { getIndustryInsights } from "@/actions/dashboard";
import { onBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import DashBoardView from "./_components/dashboard-view";

const DashBoard = async () => {
  const { isOnBorded } = await onBoardingStatus();

  if(!isOnBorded) {
    redirect("/onboarding")
  }

  const insights = await getIndustryInsights();
  console.log("this is the insights what we created ", insights);

  if (!insights) {
    // Handle the case where insights is undefined
    redirect("/error"); // Redirect to an error page or handle appropriately
  }

  return (
    <div className="container mx-auto">
      <DashBoardView insights={insights} />
    </div>
  );
};

export default DashBoard;
