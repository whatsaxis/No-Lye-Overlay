export const installations = ['vanilla', 'lunar', 'badlion', 'pvplounge', 'none'] as const

type InstallationType<T extends ReadonlyArray <unknown>> = T extends ReadonlyArray<infer InstallationType>
  ? InstallationType
  : never

export type Installation = InstallationType<typeof installations>

export const storageKeys = <const>[
  'username',
  'client',
  'api-key',
  'transparency'
]

export type StorageKey = {
  name: typeof storageKeys[number],
  value: any
}