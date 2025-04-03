import Agent from "@/components/Agent";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const MockInterviewPage = async () => {
  const user = await currentUser();

  if(!user) {
    redirect("/")
  }

  return (
    <div>
      <p className="text-5xl font-bold  gradiengt-title mb-5">Mock Interview page</p>


      <Agent
        userId={user?.id}
        userName={user?.firstName as string}
        type="generate"
        profileImage={user?.imageUrl}
      />
    </div>
  );
};

export default MockInterviewPage;

/* 

 id: 'user_2v0NNiEponAixpPGyMoN9CdwKCw',
  passwordEnabled: false,
  totpEnabled: false,
  backupCodeEnabled: false,
  twoFactorEnabled: false,
  banned: false,
  locked: false,
  createdAt: 1743277992625,
  updatedAt: 1743687217378,
  imageUrl: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydjBOTmZYRmhlZ0ZSWWVwTnhCZFhWeVJpS0MifQ',
  hasImage: true,
  primaryEmailAddressId: 'idn_2v0NMaruoiXIyG5qSx6ij7OCTT6',
  primaryPhoneNumberId: null,
  primaryWeb3WalletId: null,
  lastSignInAt: 1743687217359,
  externalId: null,
  username: null,
  firstName: 'Pratyush',
  lastName: null,
  publicMetadata: {},
  privateMetadata: {},
  unsafeMetadata: {},
  emailAddresses: [
    _EmailAddress {
      id: 'idn_2v0NMaruoiXIyG5qSx6ij7OCTT6',
      emailAddress: 'pratyushsinha934@gmail.com',
      verification: [_Verification],
      linkedTo: [Array]
    }
  ],
*/
