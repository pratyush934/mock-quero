"use client";

import { improveWithAI } from "@/actions/resume";
import useFetch from "@/app/hooks/use-fetch";
import { entrySchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle, Sparkles, X } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { parse, format } from "date-fns";

type Entry = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
};

type EntryFormProps = {
  type: string;
  entries: Entry[];
  onChange: (entries: Entry[]) => void;
};

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

const EntryForm: React.FC<EntryFormProps> = ({ type, entries, onChange }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Entry>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    },
  });

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improvedContent,
    error: improveError,
  } = useFetch(improveWithAI);

  const current = watch("current");

  const handleAdd = useCallback(
    handleValidation((data) => {
      const formattedEntry = {
        ...data,
        startDate: formatDisplayDate(data.startDate),
        endDate: data.current ? "" : formatDisplayDate(data.endDate),
      };

      onChange([...entries, formattedEntry]);
      reset();
      setIsAdding(false);
    }),
    [entries, onChange, reset]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newEntries = entries.filter((_, i) => i !== index);
      onChange(newEntries);
    },
    [entries, onChange]
  );

  const handleImproveDescription = useCallback(async () => {
    const description = watch("description");
    if (!description) {
      toast.error("Please enter a description first");
      return;
    }

    try {
      await improveWithAIFn({
        current: description,
        type: type.toLowerCase(), // 'experience', 'education', or 'project'
      });
    } catch (error) {
      toast.error("Failed to improve description");
    }
  }, [improveWithAIFn, type, watch]);

  useEffect(() => {
    if (improvedContent && !isImproving) {
      setValue("description", improvedContent);
      toast.success("Description improved successfully!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description");
    }
  }, [improvedContent, improveError, isImproving, setValue]);

  const renderEntryCard = useCallback(
    (item: Entry, index: number) => (
      <Card key={index}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {item.title} @ {item.organization}
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => handleDelete(index)}
            aria-label="Delete entry"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {item.current
              ? `${item.startDate} - Present`
              : `${item.startDate} - ${item.endDate}`}
          </p>
          <p className="mt-2 text-sm whitespace-pre-wrap">{item.description}</p>
        </CardContent>
      </Card>
    ),
    [handleDelete]
  );

  const renderForm = useMemo(
    () => (
      <Card>
        <CardHeader>
          <CardTitle>Add {type}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Title/Position"
              register={register("title")}
              error={errors.title}
            />
            <InputField
              label="Organization/Company"
              register={register("organization")}
              error={errors.organization}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              type="month"
              register={register("startDate")}
              error={errors.startDate}
            />
            <InputField
              label="End Date"
              type="month"
              register={register("endDate")}
              error={errors.endDate}
              disabled={current}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="current"
              {...register("current")}
              onChange={(e) => {
                setValue("current", e.target.checked);
                if (e.target.checked) {
                  setValue("endDate", "");
                }
              }}
            />
            <label htmlFor="current">Current {type}</label>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder={`Description of your ${type.toLowerCase()}`}
              className="h-32"
              {...register("description")}
              aria-label="Description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleImproveDescription}
            disabled={isImproving || !watch("description")}
          >
            {isImproving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Improve with AI
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setIsAdding(false);
            }}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleAdd}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </CardFooter>
      </Card>
    ),
    [
      current,
      errors,
      handleAdd,
      handleImproveDescription,
      isImproving,
      register,
      reset,
      setValue,
      type,
      watch,
    ]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-4">{entries?.map(renderEntryCard)}</div>
      {isAdding ? (
        renderForm
      ) : (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  type?: string;
  register: ReturnType<typeof useForm>["register"];
  error?: { message?: string };
  disabled?: boolean;
}> = ({ label, type = "text", register, error, disabled }) => (
  <div className="space-y-2">
    <Input type={type} placeholder={label} {...register} disabled={disabled} />
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);

export default EntryForm;
