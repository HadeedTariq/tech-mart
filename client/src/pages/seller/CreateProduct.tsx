import { useForm } from "react-hook-form";
import { Product, productValidator } from "../../validators/product.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../store/hooks/storeHooks";
import { useMutation } from "@tanstack/react-query";
import { sellerApi } from "../../config/axios";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { categories } from "../../utils/categories";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const CreateProduct = () => {
  const toast = useToast();
  const [img, setImg] = useState<[string, File] | []>([]);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setImg([url, acceptedFiles[0]]);
  }, []);
  const { getInputProps, getRootProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  const { user } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<Product>({
    resolver: zodResolver(productValidator),
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (product: Product) => {
      const { data } = await sellerApi.post("/create", {
        ...product,
        productSeller: user?.id,
      });
      toast({
        title: data.message,
        status: "success",
        isClosable: true,
      });
      reset();
      setImg([]);
    },
  });
  const createProduct = (product: Product) => {
    const prod = { ...product, productPrice: `$${product.productPrice}` };
    mutate(prod);
  };
  useEffect(() => {
    if (user?.role !== "seller") return;
  }, []);
  useEffect(() => {
    if (!img.length) return;
    const data = new FormData();
    data.append("file", img[1]);
    data.append("upload_preset", "n5y4fqsf");
    data.append("cloud_name", "lmsproject");
    axios
      .post("https://api.cloudinary.com/v1_1/lmsproject/image/upload", data)
      .then((data: any) => {
        setValue("productImage", data.data.secure_url);
      })
      .catch(() => {
        toast({
          title: "Something went wrong while uploading file to cloud",
          status: "error",
          isClosable: true,
        });
      });
  }, [img]);
  return (
    <>
      <form
        onSubmit={handleSubmit(createProduct)}
        className="flex flex-col gap-2 p-4">
        {errors.productTitle && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productTitle.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Enter product Title here"
          className="mb-2 bg-transparent font-Lato p-2 border-2 border-pink-500 rounded-sm"
          {...register("productTitle")}
        />
        {errors.productDescription && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productDescription.message}
          </p>
        )}
        <textarea
          placeholder="Enter product description here"
          {...register("productDescription")}
          className="mb-2 resize-none w-full font-Lato h-[300px] bg-transparent p-2 border-2 border-pink-500 rounded-sm"></textarea>
        {errors.productCategory && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productCategory.message}
          </p>
        )}
        <select
          className="mb-2  bg-slate-700 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none capitalize font-Lato text-[18px] cursor-pointer"
          {...register("productCategory")}>
          {categories.map((category, i) => (
            <option
              value={category}
              key={i}
              className="bg-black cursor-pointer capitalize hover:bg-gray-700">
              {category}
            </option>
          ))}
        </select>
        {errors.productPrice && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productPrice.message}
          </p>
        )}
        <input
          className="mb-2 bg-transparent font-Lato p-2 border-2 border-pink-500 rounded-sm"
          type="number"
          placeholder="Enter product price in $"
          onChange={(e) => {
            setValue("productPrice", String(e.target.value));
          }}
        />
        {errors.productType && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productType.message}
          </p>
        )}
        <select
          className="mb-2  bg-slate-700 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none capitalize font-Lato text-[18px] cursor-pointer"
          {...register("productType")}>
          <option
            value={"Used"}
            className="bg-black cursor-pointer capitalize hover:bg-gray-700">
            Used
          </option>
          <option
            value={"New"}
            className="bg-black cursor-pointer capitalize hover:bg-gray-700">
            New
          </option>
        </select>
        {errors.productImage && (
          <p className="text-red-400 font-semibold font-Fira">
            {errors.productImage.message}
          </p>
        )}
        <div className="mb-2 border-2 border-pink-500  mx-auto w-[500px] h-[300px] flex items-center justify-center">
          {!img[0] && (
            <div
              className="font-Chivo font-semibold text-[19px]"
              {...getRootProps()}>
              {isDragActive ? (
                <p className="text-pink-500 font-semibold font-Kanit text-2xl">
                  Drop Here{" "}
                </p>
              ) : (
                <>
                  <span> Drag and Drop or </span>
                  <label
                    htmlFor="img"
                    className="text-orange-500 underline hover:text-orange-400 cursor-pointer font-Fira">
                    Select
                    <input
                      type="file"
                      hidden
                      name="img"
                      id="img"
                      onChange={(e) => {
                        if (!e.target.files?.length) return;
                        const url = URL.createObjectURL(e.target.files[0]);
                        setImg([url, e.target.files[0]]);
                      }}
                    />
                  </label>
                  <input {...getInputProps()} />
                </>
              )}
            </div>
          )}
          {img[0] && (
            <img
              src={img[0]}
              alt="dfdf"
              className="w-full overflow-hidden h-full"
            />
          )}
        </div>
        <button
          className="bg-purple-500 py-2 px-8 font-bold font-NunitoSans text-[20px] rounded-md mx-auto disabled:bg-purple-300"
          disabled={isPending}>
          Create Product
        </button>
      </form>
    </>
  );
};

export default CreateProduct;
