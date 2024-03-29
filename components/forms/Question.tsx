"use client";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  type?: string;
  getUserId: string;
  questionDetails?: string;
}

const Question = ({ type, getUserId, questionDetails }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // To get the question details in edit mode
  const getQuestionDetails =
    questionDetails && JSON.parse(questionDetails || "");
  const getTags = getQuestionDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: getQuestionDetails?.title || "",
      description: getQuestionDetails?.description || "",
      tags: getTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);

    try {
      if (type === "edit") {
        await editQuestion({
          questionId: getQuestionDetails._id,
          title: values.title,
          description: values.description,
          path: pathname,
        });
        router.push(`/question/${getQuestionDetails._id}`);
        toast({
          title: "Question has been successfully edited.",
        });
      } else {
        await createQuestion({
          title: values.title,
          description: values.description,
          tags: values.tags,
          author: JSON.parse(getUserId),
          path: pathname,
        });
        router.push("/");
        toast({
          title: "Question has been successfully submitted!",
          description: "Thank you for contributing to the community.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops! Something went wrong.",
        description: `${error}`,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagDelete = (tag: string, field: any) => {
    const newTags = field.value.filter((e: string) => e !== tag);

    form.setValue("tags", newTags);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Question Title<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Start a discussion or ask a question
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Description of your question or discussion.
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={getQuestionDetails?.description || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:14px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Give a detailed description of your question or discussion -
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark400_light800 paragraph-semibold">
                Tags<span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    disabled={type === "edit"}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          onClick={() =>
                            type !== "edit"
                              ? handleTagDelete(tag, field)
                              : () => {}
                          }
                          className=" background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none p-2 capitalize"
                        >
                          {tag}{" "}
                          {type !== "edit" && (
                            <XCircle
                              size={12}
                              className="text-dark400_light800 cursor-pointer object-contain"
                            />
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add tags to categorize your question or discussion - Maximum 3
                tags.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
