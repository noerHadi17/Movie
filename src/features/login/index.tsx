import { useForm } from "react-hook-form";
import { CustomFormField, Form } from "../../components/form";
import { loginSchema, type LoginSchema } from "../../services/auth/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import { postAuth } from "../../services/auth/api";
import { useToken } from "../../hooks/useToken";

const Login = () => {
  const { changeUser } = useToken();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await postAuth(data);

      if (response) {
        const user = {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
          username: response?.username,
          email: response?.email,
          image: response?.image,
        };
        changeUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col min-h-screen justify-center items-center gap-5 bg-gray-900 text-white px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-red-600 mb-8">Iclixx</h1>
        <CustomFormField<LoginSchema>
          control={control}
          name="username"
          label="Username"
        >
          {(field) => <Input {...field} placeholder="Username" type="text" className="bg-gray-800 border-gray-600 text-white" />}
        </CustomFormField>

        <CustomFormField<LoginSchema>
          control={control}
          name="password"
          label="Password"
        >
          {(field) => (
            <Input {...field} placeholder="Password" type="password" className="bg-gray-800 border-gray-600 text-white" />
          )}
        </CustomFormField>

        <button className="bg-red-600 text-white py-2 px-5 rounded-md cursor-pointer hover:bg-red-700">
          Login
        </button>
      </form>
    </Form>
  );
};

export default Login;
