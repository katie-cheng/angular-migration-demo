export interface Preference {
  id: string;
  label: string;
  value: string;
  updatedOn: string;
}

export interface PreferencePage {
  items: Preference[];
  total: number;
  page: number;
  pageSize: number;
}
