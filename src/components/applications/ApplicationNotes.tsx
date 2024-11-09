import React, { useState } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useApplications } from '../../context/ApplicationContext';

interface ApplicationNotesProps {
  applicationId: string;
}

export function ApplicationNotes({ applicationId }: ApplicationNotesProps) {
  const { getApplicationById, addNote } = useApplications();
  const [newNote, setNewNote] = useState('');
  const application = getApplicationById(applicationId);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    addNote(applicationId, newNote);
    setNewNote('');
  };

  if (!application) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        <span className="text-sm text-gray-500">
          {application.notes?.length || 0} notes
        </span>
      </div>

      <div className="flex space-x-3">
        <div className="flex-grow">
          <textarea
            rows={2}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Note
        </button>
      </div>

      {application.notes && application.notes.length > 0 ? (
        <div className="space-y-4">
          {application.notes.map((note, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600">{note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          No notes yet. Add a note to track important information about this application.
        </p>
      )}
    </div>
  );
}