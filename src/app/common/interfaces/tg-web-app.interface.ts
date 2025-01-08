export interface TgWebApp {
  version: string; // Version of the Telegram Web App library
  initData: string; // Initialization data
  initDataUnsafe: Record<string, unknown>; // Parsed initData object
  colorScheme: "light" | "dark"; // Current theme
  themeParams: {
    backgroundColor?: string;
    textColor?: string;
    hintColor?: string;
    linkColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
  }; // Theme parameters
  
  viewportHeight: number; // Current height of the viewport in pixels
  isExpanded: boolean; // Whether the Web App is expanded
  MainButton: TelegramMainButton; // The main button interface
  BackButton: TelegramBackButton; // The back button interface
  HapticFeedback: TelegramHapticFeedback; // Haptic feedback interface

  close(): void; // Closes the Web App
  expand(): void; // Expands the Web App
  showPopup(params: TelegramPopupParams, callback?: (buttonId: string) => void): void; // Shows a popup
  setHeaderColor(color: "bg_color" | "bg_transparent"): void; // Sets the header color
  enableClosingConfirmation(): void; // Enables the closing confirmation popup
  disableClosingConfirmation(): void; // Disables the closing confirmation popup
}

export interface TelegramMainButton {
  text: string; // Button text
  color?: string; // Button color
  textColor?: string; // Button text color
  isVisible: boolean; // Whether the button is visible
  isActive: boolean; // Whether the button is active

  show(): void; // Shows the main button
  hide(): void; // Hides the main button
  enable(): void; // Enables the main button
  disable(): void; // Disables the main button
  setText(text: string): void; // Sets the button text
  setColor(color: string): void; // Sets the button color
  setTextColor(textColor: string): void; // Sets the button text color
  onClick(callback: () => void): void; // Sets an onClick callback
}

export interface TelegramBackButton {
  isVisible: boolean; // Whether the back button is visible

  show(): void; // Shows the back button
  hide(): void; // Hides the back button
  onClick(callback: () => void): void; // Sets an onClick callback
}

export interface TelegramHapticFeedback {
  impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void; // Creates haptic feedback for impacts
  notificationOccurred(type: "success" | "warning" | "error"): void; // Creates haptic feedback for notifications
  selectionChanged(): void; // Creates haptic feedback for selection change
}

export interface TelegramPopupParams {
  title?: string; // Popup title
  message: string; // Popup message
  buttons: {
    id: string; // Button ID
    type: "default" | "ok" | "close" | "cancel" | "destructive"; // Button type
    text: string; // Button text
  }[];
}
