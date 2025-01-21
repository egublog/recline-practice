import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  ja: {
    translation: {
      todo: {
        title: "TODOリスト",
        add: "追加",
        delete: "削除",
        edit: "編集",
        save: "保存",
        cancel: "キャンセル",
        placeholder: "新しいタスクを入力...",
        empty: "タスクがありません",
        remaining: "残りのタスク: {{count}}件",
        completed: "完了したタスク: {{count}}件",
        clearCompleted: "完了したタスクを削除",
        all: "すべて",
        active: "未完了",
        completed_label: "完了済",
        allTasks: "全てのタスク: {{count}}",
        toggleLanguage: "{{lang}}に切り替え",
        darkMode: "ダークモードに切り替え",
        lightMode: "ライトモードに切り替え",
        toggleColorMode: "カラーモード切り替え",
        footer: "© {{year}} Todoリスト - Powered by Chakra UI",
        modal: {
          title: "タスクの追加",
          confirm: "以下のタスクを追加しますか？",
          add: "タスクを追加",
        },
        sections: {
          pending: "未完了のタスク",
          completed: "完了済みのタスク",
          empty: "タスクがありません。新しいタスクを追加してください。",
        },
        count: "{{count}} 件",
        error: {
          required: "タスクを入力してください",
          maxLength: "タスクは100文字以内で入力してください",
          duplicate: "同じタスクが既に存在します",
        },
      },
    },
  },
  en: {
    translation: {
      todo: {
        title: "TODO List",
        add: "Add",
        delete: "Delete",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        placeholder: "Enter new task...",
        empty: "No tasks",
        remaining: "{{count}} tasks remaining",
        completed: "{{count}} tasks completed",
        clearCompleted: "Clear completed",
        all: "All",
        active: "Active",
        completed_label: "Completed",
        allTasks: "All tasks: {{count}}",
        toggleLanguage: "Switch to {{lang}}",
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode",
        toggleColorMode: "Toggle color mode",
        footer: "© {{year}} Todo List - Powered by Chakra UI",
        modal: {
          title: "Add Task",
          confirm: "Do you want to add the following task?",
          add: "Add Task",
        },
        sections: {
          pending: "Pending Tasks",
          completed: "Completed Tasks",
          empty: "No tasks. Add a new task to get started.",
        },
        count: "{{count}} items",
        error: {
          required: "Task is required",
          maxLength: "Task must be less than 100 characters",
          duplicate: "Task already exists",
        },
      },
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "ja",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
