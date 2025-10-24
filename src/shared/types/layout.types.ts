type MenuItem = {
  key: string;
  label: React.ReactNode;
};

export const menuItems: MenuItem[] = [
  {key: "/", label: "Аналитика"},
  {key: "/users", label: "Клиенты"},
  {key: "/deals", label: "Сделки"},
];
