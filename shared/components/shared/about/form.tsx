"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
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

export const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, touchedFields, isSubmitted },
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
    Boolean(touchedFields[name]) || Boolean(isSubmitted);

  const onSubmit = (data: FormSchema) => {
    console.log("Submit data:", data);
    reset();
    clearErrors();
  };

  // Refs and helpers for phone formatting & caret management
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const formatPhoneFromDigits = React.useCallback((digitsRaw: string) => {
    let digits = digitsRaw;
    if (!digits) return "";
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    else if (digits.startsWith("9")) digits = "7" + digits;
    else if (!digits.startsWith("7")) digits = "7" + digits;
    digits = digits.slice(0, 11);
    const country = digits[0] || "";
    const part = digits.slice(1);
    const p1 = part.slice(0, 3);
    const p2 = part.slice(3, 6);
    const p3 = part.slice(6, 8);
    const p4 = part.slice(8, 10);
    let formatted = `+${country}`;
    if (part.length > 0) {
      formatted += ` (${p1}`;
      if (p1.length === 3) formatted += `)`;
    }
    if (p2) formatted += ` ${p2}`;
    if (p3) formatted += `-${p3}`;
    if (p4) formatted += `-${p4}`;
    return formatted;
  }, []);

  const computeRawIndexAtPos = React.useCallback((formatted: string, pos: number) => {
    let rawIdx = 0;
    for (let i = 0; i < pos; i++) {
      if (/\d/.test(formatted[i])) rawIdx++;
    }
    return rawIdx - 1;
  }, []);

  const computePosForRawIndex = React.useCallback((formatted: string, rawIndex: number) => {
    if (rawIndex < 0) return 0;
    let count = -1;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) count++;
      if (count === rawIndex) return i + 1;
    }
    return formatted.length;
  }, []);

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
              {errors.name && showError("name") && (
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
                errors.name && showError("name") ? "error" : ""
              }`}
              aria-invalid={!!(errors.name && showError("name"))}
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

            {/* Controlled phone input (registered) */}
            {(() => {
              const phoneRegister = register("phone");
              const phoneValue = watch("phone") as string;

              return (
                <input
                  id="phone"
                  type="tel"
                  placeholder="Ваш телефон"
                  {...phoneRegister}
                  ref={(el) => {
                    phoneRegister.ref(el);
                    inputRef.current = el;
                  }}
                  value={phoneValue ?? ""}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const digits = phoneDigits(raw);
                    const formatted = formatPhoneFromDigits(digits);
                    setValue("phone", formatted, { shouldValidate: true, shouldDirty: true });
                  }}
                  onBlur={(e) => {
                    const digits = phoneDigits(e.target.value);
                    const formatted = formatPhoneFromDigits(digits);
                    setValue("phone", formatted, { shouldValidate: true, shouldDirty: true });
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Backspace") return;
                    const input = inputRef.current;
                    if (!input) return;
                    const selStart = input.selectionStart ?? 0;
                    const selEnd = input.selectionEnd ?? 0;
                    const val = input.value;
                    if (selStart !== selEnd) return;
                    const prevChar = val[selStart - 1];
                    if (!prevChar) return;
                    if (/[\s()+-]/.test(prevChar)) {
                      e.preventDefault();
                      const rawIdx = computeRawIndexAtPos(val, selStart - 1);
                      const rawDigits = phoneDigits(val);
                      if (rawIdx >= 0 && rawIdx < rawDigits.length) {
                        const newDigits =
                          rawDigits.slice(0, rawIdx) + rawDigits.slice(rawIdx + 1);
                        const newFormatted = formatPhoneFromDigits(newDigits);
                        setValue("phone", newFormatted, { shouldValidate: true, shouldDirty: true });
                        setTimeout(() => {
                          const newPos = computePosForRawIndex(newFormatted, rawIdx - 1);
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }
                    }
                  }}
                  className={`communication__form-fields-field ${
                    errors.phone && showError("phone") ? "error" : ""
                  }`}
                  aria-invalid={!!(errors.phone && showError("phone"))}
                />
              );
            })()}
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
              errors.terms && showError("terms") ? "error" : ""
            }`}
            aria-invalid={!!(errors.terms && showError("terms"))}
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
          {errors.terms && showError("terms") && (
            <span role="alert" className="communication__form-error">
              {errors.terms.message}
            </span>
          )}
        </div>

        <button type="submit" className="communication__form-button">
          Отправить
        </button>
      </form>
    </section>
  );
};

export default Form;
