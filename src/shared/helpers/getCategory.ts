export type TCategory = 'A' | 'B' | 'C' | 'D';

export function getCategory(categody: TCategory) {
    switch (categody) {
        case 'A':
            return { title: 'Ключевой клиент', color: '#52c41a' };
        case 'B':
            return { title: 'Перспективный клиент', color: '#1677ff' };
        case 'C':
            return { title: 'Регулярный клиент', color: '#faad14' };
        case 'D':
            return { title: 'Новый клиент', color: '#fa541c' };
    }
}
