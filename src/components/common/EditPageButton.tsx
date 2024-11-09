import React from 'react';
import { Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface EditPageButtonProps {
  pageId: string;
  onEdit: () => void;
}

export function EditPageButton({ pageId, onEdit }: EditPageButtonProps) {
  const { user } = useAuth();

  if (user?.role !== 'admin') return null;

  return (
    <button
      onClick={onEdit}
      className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      title="Edit Page"
    >
      <Pencil className="h-6 w-6" />
    </button>
  );
}