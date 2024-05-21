"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  address: z.string(),
  email: z.string().email(),
  phone: z.string().min(10),
  birthday: z.date(),
});

export type Schema = z.infer<typeof schema>;

type Props = {
  name: string | undefined;
  age: number | undefined;
  address: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  birthday: Date | undefined;
};

export const Form = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: props,
    reValidateMode: "onChange",
  });

  const handleChange = () => {
    const values = getValues();
    fetch("http://localhost:3000/api/form", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div>
          <label>Name</label>
          <input
            {...register("name", {
              onChange: handleChange,
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Age</label>
          <input
            {...register("age", {
              onChange: handleChange,
            })}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label>Address</label>
          <input
            {...register("address", {
              onChange: handleChange,
            })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            {...register("email", {
              onChange: handleChange,
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Phone</label>
          <input
            {...register("phone", {
              onChange: handleChange,
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <div>
          <label>Birthday</label>
          <input
            type="date"
            {...register("birthday", {
              onChange: handleChange,
            })}
          />
          {errors.birthday && <p>{errors.birthday.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
