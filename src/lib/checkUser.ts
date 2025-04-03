import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";


export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    //if user is stored or not

    const logedInUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (logedInUser) {
      return logedInUser;
    }

    const name = `${user.firstName}${user.lastName}`;

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        experience: 0, // Default value for the required 'experience' field
      },
    });

    return newUser;
  } catch (e) {
    console.log(
      "Error exist while saving or getting the error in lib/checkUser.ts", e
    );
    throw new Error("Issue exist in checkUser")
  }
};
