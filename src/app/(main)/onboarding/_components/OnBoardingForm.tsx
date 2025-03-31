"use client";
import { onBoardingSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IndustryType } from "@/data/industries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const OnBoardingForm = ({ industries }: { industries: IndustryType[] }) => {
  const [selectIndustry, setSelectIndustry] = useState<
    IndustryType | undefined
  >();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onBoardingSchema),
  });

  const watchIndustry = watch("industry")

  const onSubmit = async (values ) => {
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full mt-10 max-w-lg mx-2">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry" className="ml-2">
                Industry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectIndustry(industries.find((ind) => ind.id === value));
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className="mt-2 w-full">
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((ind) => (
                      <SelectItem value={ind.id} key={ind.id}>
                        {ind.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <div className="bg-red text-sm font-black">
                  {errors.industry.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subIndustry" className="ml-2 mt-4 mb-0">
                SubIndustry
              </Label>
              <Select
                onValueChange={(value) => {
                  setValue("subIndustry", value);
                }}
              >
                <SelectTrigger id="industry" className="mt-2 w-full">
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Specialization</SelectLabel>
                    {selectIndustry?.subIndustries.map((sub) => (
                      <SelectItem value={sub} key={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.industry && (
                <div className="bg-red text-sm font-black">
                  {errors.industry.message}
                </div>
              )}
            </div>

            <div className="space-y-2 mt-5">
              <Label className="ml-2">Experience</Label>
              <Input
                id="experience"
                type="number"
                max={20}
                min={0}
                placeholder="Please enter you experience"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-red font-bold font-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-5">
              <Label className="ml-2">Skills</Label>
              <Input
                id="skills"
                type="string"
                placeholder="Python, JavaScript, TypeScript, etc"
                {...register("skills")}
              />
              <p className="text-sm italic">
                Please add your skills with , (comma) seperated
              </p>
              {errors.skills && (
                <p className="text-red font-bold font-sm">
                  {errors.skills.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-5">
              <Label>Bio</Label>
              <Textarea
                id="bio"
                className="space-y-2 mt-2"
                placeholder="Please add your bio "
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-red font-bold font-sm">
                  {errors.bio.message}
                </p>
              )}
            </div>
            {errors.bio && (
              <p className="text-red font-bold font-sm">{errors.bio.message}</p>
            )}
            <Button type="submit" className="w-full w-max-lg mt-5">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnBoardingForm;
