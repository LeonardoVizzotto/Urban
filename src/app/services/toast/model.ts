export interface Toast {
  message: string;
  appearence: toastAppearence;
  id?: number;
  show?: boolean;
}

export type toastAppearence = 'success' | 'error';
