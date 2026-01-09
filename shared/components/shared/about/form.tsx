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
    .min(1, "Введите номер телефона")
    .refine(
      (val) => {
        const d = phoneDigits(val);
        return d.length === 11 && d.startsWith("7");
      },
      { message: "Неверный формат номера" }
    ),
  position: z.string().min(1, "Введите должность"),
  email: z.string().email("Неверный email"),
  company: z.string().min(1, "Введите название компании"),
  address: z.string().min(1, "Введите адрес компании"),
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
    formState: { errors, touchedFields, isSubmitted },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    defaultValues: {
      name: "",
      phone: "",
      position: "",
      email: "",
      company: "",
      address: "",
      message: "",
      terms: false,
    },
  });

  const showError = (name: keyof FormSchema) =>
    isSubmitted || touchedFields[name];

  const onSubmit = (data: FormSchema) => {
    console.log("Submit data:", data);
    reset();
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

          <label htmlFor="position" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.position && (
                <span role="alert" className="communication__form-error">
                  {errors.position.message}
                </span>
              )}
            </div>
            <input
              id="position"
              {...register("position")}
              type="text"
              placeholder="Ваша должность"
              className={`communication__form-fields-field ${
                errors.position ? "error" : ""
              }`}
              aria-invalid={!!errors.position}
              required
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

          <label htmlFor="company" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.company && (
                <span role="alert" className="communication__form-error">
                  {errors.company.message}
                </span>
              )}
            </div>
            <input
              id="company"
              {...register("company")}
              type="text"
              placeholder="Название компании"
              className={`communication__form-fields-field ${
                errors.company ? "error" : ""
              }`}
              aria-invalid={!!errors.company}
              required
            />
          </label>

          <label htmlFor="address" className="communication__form-field-label">
            <div className="communication__form-field-label-top">
              {errors.address && (
                <span role="alert" className="communication__form-error">
                  {errors.address.message}
                </span>
              )}
            </div>
            <input
              id="address"
              {...register("address")}
              type="text"
              placeholder="Адрес компании"
              className={`communication__form-fields-field ${
                errors.address ? "error" : ""
              }`}
              aria-invalid={!!errors.address}
              required
            />
          </label>
        </div>

        <textarea
          id="message"
          {...register("message")}
          className="communication__form-textarea"
          placeholder="Ваше сообщение"
        />

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
