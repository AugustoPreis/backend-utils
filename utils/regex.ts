export const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const CPF = /^\d{11}$/;
export const CPF_FORMATADO = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const CNPJ = /^\d{14}$/;
export const CNPJ_FORMATADO = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const URL = /https?:\/\/[^\s/$.?#].[^\s]*/;

export const CEP = /^\d{8}$/;
export const CEP_FORMATADO = /^\d{5}-\d{3}$/;

export const IP = /^(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})(\.(25[0-5]|2[0-4]\d|1\d{2}|\d{1,2})){3}$/;