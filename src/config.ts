import { SequenceWaaS } from '@0xsequence/waas'

const SEQUENCE_PROJECT_ACCESS_KEY = import.meta.env.VITE_SEQUENCE_PROJECT_ACCESS_KEY
const SEQUENCE_WAAS_CONFIG_KEY = import.meta.env.VITE_SEQUENCE_WAAS_CONFIG_KEY

export const sequence = new SequenceWaaS({
    network: 'base-sepolia',
    projectAccessKey: SEQUENCE_PROJECT_ACCESS_KEY,
    waasConfigKey: SEQUENCE_WAAS_CONFIG_KEY
})