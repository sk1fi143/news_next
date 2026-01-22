"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegionLink } from "../region-link";

const onlyLettersAndSome = /^[A-Za-zА-Яа-яЁё\s-]+$/;

const phoneDigits = (s = "") => s.replace(/\D/g, "");

const schema = z.object({
  name: z
    .string()
    .min(1, "Введите имя")
    .regex(
      onlyLettersAndSome,
      "Имя должно содержать только буквы, пробелы или дефис"
    ),
  phone: z
  .string()
  .refine((val) => {
    const d = phoneDigits(val);

    if (!d) return false;

    return d.length === 11 && d.startsWith('7');
  }, {
    message: 'Введите номер телефона',
  }),
  email: z.string().email("Неверный email"),
  message: z.string().optional(),
  terms: z.boolean().refine((val) => val, "Подтвердите согласие"),
});

type FormSchema = z.infer<typeof schema>;

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} type="text" inputMode="tel" {...props} />;
});

Input.displayName = "Input";


export const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    reset,
    clearErrors,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      terms: false,
    },
  });

  const showError = (name: keyof FormSchema) =>
    touchedFields[name];

  const onSubmit = (data: FormSchema) => {
    console.log("Submit data:", data);
    reset();
    clearErrors();
  };

  return (
    <section className="communication" aria-labelledby="comm-title">
      <h2 id="comm-title" className="communication__title">
        Связаться с нами
      </h2>
      <p className="communication__text">
        Если у вас есть вопросы или предложения свяжитесь с нами через
        контактную форму ниже
      </p>

      <form
        className="communication__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="communication__form-fields">
          <label htmlFor="name" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.name && (
                <span role="alert" className="communication__form-error">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Ваше имя"
              className={`communication__form-fields-field ${
                errors.name ? "error" : ""
              }`}
              aria-invalid={!!errors.name}
              required
            />
          </label>

          <label htmlFor="phone" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.phone && showError("phone") && (
                <span role="alert" className="communication__form-error">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PatternFormat
                  format="+7 (###) ###-##-##"
                  mask="_"
                  onValueChange={(vals) => {
                    field.onChange(vals.formattedValue);
                  }}
                  value={field.value ?? ""}
                  getInputRef={field.ref}
                  placeholder="Ваш телефон"
                  customInput={Input}
                  className={`communication__form-fields-field ${
                    errors.phone && showError("phone") ? "error" : ""
                  }`}
                />
              )}
            />
          </label>

          <label htmlFor="email" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.email && showError("email") && (
                <span role="alert" className="communication__form-error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Ваш email"
              className={`communication__form-fields-field ${
                errors.email && showError("email") ? "error" : ""
              }`}
              aria-invalid={!!errors.email}
              required
            />
          </label>

          <textarea
          id="message"
          {...register("message")}
          className="communication__form-textarea"
          placeholder="Ваше сообщение"
        />
        </div>


        <div className="communication__form-terms">
          <input
            id="terms-checkbox"
            {...register("terms")}
            type="checkbox"
            className={`communication__form-terms-checkbox ${
              errors.terms ? "error" : ""
            }`}
            aria-invalid={!!errors.terms}
            required
          />
          <label
            htmlFor="terms-checkbox"
            className="communication__form-terms-label"
          >
            Я ознакомился с условиями обработки{" "}
            <RegionLink
              href="/pp"
              className="communication__form-terms-label-primary"
              onClick={(e) => e.stopPropagation()}
            >
              персональных данных
            </RegionLink>
          </label>
        </div>

        <button type="submit" className="communication__form-button">
          Отправить
        </button>
      </form>
    </section>
  );
};

export default Form;
