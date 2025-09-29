import { useEffect } from "react";
import { useQuery } from "../../../hooks/useQuery";
import { useDetail } from "../../../hooks/product/useDetail";
import { useForm } from "react-hook-form";
import {
  productSchema,
  type ProductSchema,
} from "../../../services/product/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormField, Form } from "../../../components/form";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { postCreate, putEdit } from "../../../services/product/api";
import { useNavigate } from "react-router";

const Detail = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const id = query.get("id") as string;
  const { product, fetchData } = useDetail();
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (data: ProductSchema) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
      };
      const apiAction = id ? putEdit(id, payload) : postCreate(payload);
      const response = await apiAction;

      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price.toString(),
      });
    }
  }, [product]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col h-screen justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomFormField<ProductSchema>
          control={control}
          name="title"
          label="Title"
        >
          {(field) => <Input {...field} placeholder="Title" type="text" />}
        </CustomFormField>

        <CustomFormField<ProductSchema>
          control={control}
          name="price"
          label="Price"
        >
          {(field) => <Input {...field} placeholder="Price" type="number" />}
        </CustomFormField>

        <Button className="bg-black text-white py-2 px-5 rounded-md cursor-pointer">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default Detail;
