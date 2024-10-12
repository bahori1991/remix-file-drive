import { useOrganization, useUser } from "@clerk/clerk-react";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "~/components/ui/button";

export default function Index() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: "Hello world", orgId });
        }}
      >
        Click Me
      </Button>
    </main>
  );
}
