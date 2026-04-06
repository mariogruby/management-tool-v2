 export type Props = {
  content: string;
  onSave: (html: string) => void;
  onCancel: () => void;
  loading?: boolean;
};

export type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
};