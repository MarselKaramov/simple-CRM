export const CATEGORY_CONFIG = {
    A: { label: 'Ключевые', color: 'green' },
    B: { label: 'Перспективные', color: 'blue' },
    C: { label: 'Регулярные', color: 'orange' },
    D: { label: 'Новые', color: 'red' },
} as const;

// Конфигурация пола
export const GENDER_CONFIG = {
    male: { label: 'Мужской', color: 'blue' },
    female: { label: 'Женский', color: 'pink' },
} as const;
