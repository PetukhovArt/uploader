import { z } from 'zod'

export const fileInputSchema = z.instanceof(File)
