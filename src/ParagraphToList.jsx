// import { Button } from "@/components/ui/button";
// import { Form, FormLabel, FormDescription } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import React, { useMemo, useRef, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { callApi } from "../../utils/callApi";
// import { useToast } from "@/components/ui/use-toast";
// import dynamic from "next/dynamic";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { CATEGORIES } from "../../utils/Constants";
// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// const CreateBlog = () => {
//   const form = useForm({
//     defaultValues: {},
//   });
//   const editor = useRef(null);
//   const [slugData, setSlugData] = useState("");
//   const [content, setContent] = useState("");
//   const [desError, setDesError] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState([]);

//   const config = useMemo(
//     () => ({
//       uploader: {
//         insertImageAsBase64URI: true,
//       },
//       readonly: false,
//       spellcheck: true,
//       placeholder: "Start typing...",
//     }),
//     []
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = form;
//   const { toast } = useToast();

//   const handleBlogChange = (e) => {
//     console.log(e, "E");
//     setContent(e);
//     if (e == "<p><br></p>") {
//       setDesError(true);
//     } else {
//       setDesError(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     if (!desError) {
//       const reader = new FileReader();
//       reader.readAsDataURL(data.image[0]);
//       reader.onload = async (e) => {
//         const base64String = e.target?.result;
//         const dataToSend = {
//           title: data.title,
//           slug: data.slug,
//           description: data.description,
//           blog: content,
//           baseImage: base64String,
//           categories: selectedCategory,
//         };
//         const res = await callApi("post", "/api/blog", dataToSend, toast);
//         if (res?.meta?.code === 200) {
//           reset();
//           setContent("");
//           setSelectedCategory([]);
//         }
//         console.log(res, "data");
//       };
//     }
//   };
//   const getFile = () => {
//     document.getElementById("upfile")?.click();
//   };

//   const badgeData = CATEGORIES;

//   const handleCategorySelect = (cat) => {
//     if (selectedCategory?.includes(cat)) {
//       const arr = selectedCategory?.filter((item) => item !== cat);
//       setSelectedCategory(arr);
//     } else {
//       setSelectedCategory((prev) => [...prev, cat]);
//     }
//   };
//   console.log(selectedCategory, "selectedCategory");
//   return (
//     <div className="lg:w-[50%]">
//       <div className="flex items-center justify-between space-y-2 mb-4">
//         <h2 className="text-3xl font-bold tracking-tight">Create Blog</h2>
//       </div>
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <div>
//             <FormLabel>Title</FormLabel>
//             <Input
//               placeholder="Enter"
//               onKeyUp={(e) => setSlugData(slugify(e.target.value))}
//               {...register("title", { required: true })}
//             />
//             {errors.title && (
//               <FormDescription className="text-red-700">This field is required</FormDescription>
//             )}
//           </div>
//           <div>
//             <FormLabel>Slug</FormLabel>
//             <Input
//               placeholder="Enter Slug"
//               defaultValue={slugData}
//               {...register("slug", { required: true })}
//             />
//             {errors.slug && (
//               <FormDescription className="text-red-700">This field is required</FormDescription>
//             )}
//           </div>
//           <div>
//             <FormLabel>Description</FormLabel>
//             <Textarea
//               placeholder="Enter Brief Description"
//               {...register("description", { required: true })}
//             />
//             {errors.title && (
//               <FormDescription className="text-red-700">This field is required</FormDescription>
//             )}
//           </div>
//           <div>
//             <FormLabel>Blog</FormLabel>
//             <JoditEditor
//               ref={editor}
//               value={content}
//               config={config}
//               onChange={handleBlogChange}
//               onBlur={() => {}}
//             />
//             {desError && <FormDescription className="text-red-700">Enter Description</FormDescription>}
//           </div>
//           <div>
//             <FormLabel>Select Related Categories :</FormLabel>
//             <div className="mt-2">
//               {badgeData?.map((data) => (
//                 <Badge
//                   key={data}
//                   onClick={() => handleCategorySelect(data)}
//                   className="mr-2 cursor-pointer p-1 px-3 mb-2"
//                   variant={selectedCategory?.includes(data) ? "" : "outline"}
//                 >
//                   {data}
//                 </Badge>
//               ))}
//             </div>
//             {errors.title && (
//               <FormDescription className="text-red-700">This field is required</FormDescription>
//             )}
//           </div>
//           <div>
//             <FormLabel>Thumbnail</FormLabel>
//             <Input
//               type="file"
//               accept="image/*"
//               {...register("image", { required: true })}
//             />
//             {errors.image && (
//               <FormDescription className="text-red-700">Image is required</FormDescription>
//             )}
//           </div>
//           <Button type="submit" disabled={isSubmitting}>
//             Submit
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// const slugify = (str) =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/[\s_-]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// export default CreateBlog;