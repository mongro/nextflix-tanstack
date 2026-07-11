import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "@tanstack/react-router";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { AvatarSelect } from "./avatar-select";
import type { createProfileState } from "~/lib/dal/profile";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { createProfile } from "~/lib/dal/profile";
import Avatar from "~/components/ui/avatar";
import smiley from "~/assets/avatars/smiley.png";

type CreateProfileFormData = {
  name: string;
  avatar: string;
};

const createProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a profile name.",
  }),
  avatar: z.string({
    message: "Select an avatar",
  }),
});
export function CreateProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  const formAction = async (
    prevState: createProfileState,
    formData: FormData,
  ) => {
    const result = await createProfile({ data: formData });
    if (!result.error) {
      onSuccess();
      router.invalidate();
    }
    return result;
  };
  const [actionState, submitAction, isPending] = useActionState(formAction, {
    profile: null,
    error: null,
  });
  const [showAvatarSelection, setShowAvatarSelection] = useState(false);
  const [, startTransition] = useTransition();
  const form = useForm<CreateProfileFormData>({
    resolver: zodResolver(createProfileFormSchema),
    defaultValues: {
      name: "",
      avatar: smiley,
    },
  });

  return (
    <form
      action={submitAction}
      onSubmit={form.handleSubmit((_, e) => {
        startTransition(() => {
          const formData = new FormData(e?.target);
          submitAction(formData);
        });
      })}
    >
      <FieldGroup>
        <Controller
          name="avatar"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Dialog
                open={showAvatarSelection}
                onOpenChange={setShowAvatarSelection}
              >
                <DialogTrigger className="w-1/2 max-w-64 flex items-center justify-center relative group">
                  <div className="absolute flex items-center justify-center rounded-full size-10 group-hover:bg-background p-2 bg-background/50">
                    <PencilIcon />
                  </div>
                  <Avatar
                    src={field.value}
                    alt="avatar"
                    width={512}
                    height={512}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Choose your avatar image</DialogTitle>
                  <DialogDescription></DialogDescription>
                  <AvatarSelect
                    onSelect={(avatar: string) => {
                      form.setValue("avatar", avatar);
                      console.log("set avaatr", avatar);
                      setShowAvatarSelection(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
                hidden
                value={field.value}
              />
            </Field>
          )}
        />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
              />
              <div className="h-8">
                {actionState.error && (
                  <FieldError errors={[actionState.error]} />
                )}

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            </Field>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  );
}
