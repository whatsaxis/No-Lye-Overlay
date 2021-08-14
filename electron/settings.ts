export const installations = ['vanilla', 'lunar', 'badlion', 'pvplounge', 'none'] as const

type InstallationType<T extends ReadonlyArray <unknown>> = T extends ReadonlyArray<infer InstallationType>
  ? InstallationType
  : never

export type Installation = InstallationType<typeof installations>

export const storageKeys = <const>[
  'username',
  'client',
  'api-key',
]

export type StorageKey = {
  name: typeof storageKeys[number],
  value: string
}