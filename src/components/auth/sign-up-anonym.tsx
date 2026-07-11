import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { signUpAnonym } from "~/lib/auth/actions";
import { refreshSession, sessionQueryKey } from "~/lib/auth/auth-client";

export function SignUpAnonym() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleClick = async () => {
    setIsLoading(true);
    const response = await signUpAnonym();
    setIsLoading(false);
    if (response.success) {
      try {
        await refreshSession(queryClient);
      } catch {
        queryClient.removeQueries({ queryKey: sessionQueryKey });
      }
      navigate({ from: "/$lang/auth/login/", to: "/$lang" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 border-2 mt-2 p-6">
      <p>
        Create an anonym account without providing any data. Just for one time
        use.{" "}
      </p>
      <div>
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading && <Spinner />}
          Try it
        </Button>
      </div>
    </div>
  );
}
