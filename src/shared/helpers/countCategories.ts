import type { IAnalytics } from '../types/analytics.types';

export function countCategories(categories: IAnalytics[]) {
    const countedCategories = [
        { name: 'Ключевые клиенты', value: 0 },
        { name: 'Перспективные клиенты', value: 0 },
        { name: 'Регулярные клиенты', value: 0 },
        { name: 'Новые клиенты', value: 0 },
    ];
    for (const category of categories) {
        if (category.category === 'A') countedCategories[0].value++;
        else if (category.category === 'B') countedCategories[1].value++;
        else if (category.category === 'C') countedCategories[2].value++;
        else if (category.category === 'D') countedCategories[3].value++;
    }
    return countedCategories;
}
