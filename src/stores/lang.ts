import { writable, derived } from 'svelte/store';

type Locale = 'ru' | 'en';

interface TranslationDict {
  [key: string]: string;
}

const translations: Record<Locale, TranslationDict> = {
  ru: {
    Goal: 'Цель',
    GoalText: 'построить треугольник c максимальной площадью',
    Rule: 'Правило',
    RuleText: 'красные точки не должны лежать внутри треугольника',
    Play: 'Как играть',
    PlayText: 'ставь 3 точки на поле и двигай их',
    CurrentSquare: 'Текущая площадь',
    MaxSquare: 'Возможная площадь',
    NewTask: 'Новая задача',
    Restart: 'Заново',
    CopyLink: 'Скопировать ссылку на задачу',
    Repo: 'Репозиторий проекта',
    Name: 'Чернов Семён',
    Contacts: 'Контакты',
  },
  en: {
    Goal: 'Goal',
    GoalText: 'construct a triangle with maximum area',
    Rule: 'Rule',
    RuleText: 'the red dots should not lie inside the triangle',
    Play: 'How to play',
    PlayText: 'place 3 dots on the field and move them',
    CurrentSquare: 'Current area',
    MaxSquare: 'Possible area',
    NewTask: 'New task',
    Restart: 'Restart',
    CopyLink: 'Copy the link to the task',
    Repo: 'Project repository',
    Name: 'Chernov Semen',
    Contacts: 'Contacts',
  }
};

const locale = writable<Locale>(navigator.language.split("-")[0] == 'ru' ? 'ru' : 'en');

export const lang = derived(locale, $locale => (key: string): string => 
  translations[$locale][key] || key
);

export { locale };
