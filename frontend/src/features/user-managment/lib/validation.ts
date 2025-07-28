import {z} from 'zod'

const phoneRegExp = /^\d{10,12}$/

export const userCreateSchema = z
  .object({
    name: z.string().max(64, 'Name must be no more than 64 characters long').nonempty('Name is required'),
    surName: z.string().max(64, 'Surname must be no more than 64 characters long').nonempty('Surname is required'),
    email: z.string().email('Incorrect email address').nonempty('Email is required'),
    password: z.string().min(4, 'Password must be at least 4 characters long').nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Password confirmation is required'),
    birthDate: z.string().optional().nullable(),
    telephone: z.string().regex(phoneRegExp, 'Incorrect phone number').optional(),
    employment: z.string().optional(),
    userAgreement: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const userEditSchema = z
  .object({
    name: z.string().max(64, 'The name must be no more than 64 characters long').nonempty('Name is required'),
    surName: z.string().max(64, 'The surname must be no more than 64 characters long').nonempty('Surname is required'),
    birthDate: z.string().optional().nullable(),
    telephone: z.string().regex(phoneRegExp, 'Incorrect phone number').optional(),
    employment: z.string().optional(),
    userAgreement: z.boolean().optional(),
    password: z
      .string()
      .min(4, 'The password must be at least 4 characters long')
      .or(z.literal(''))
      .optional()
      .nullable(),
    confirmPassword: z.string().optional().nullable(),
  })
  .partial()
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  )

export type UserEditFormInputs = z.infer<typeof userEditSchema>
