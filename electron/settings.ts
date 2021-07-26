export const installations = ['vanilla', 'lunar', 'badlion', 'pvplounge'] as const

type InstallationType<T extends ReadonlyArray <unknown>> = T extends ReadonlyArray<infer InstallationType>
  ? InstallationType
  : never

export type Installation = InstallationType<typeof installations>