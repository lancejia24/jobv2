import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { type Company } from '../../types';

interface EditCompanyModalProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCompany: Company) => void;
}

export function EditCompanyModal({ company, isOpen, onClose, onSave }: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Company>(company);
  const [newCultureItem, setNewCultureItem] = useState({ title: '', description: '', image: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addCultureItem = () => {
    if (newCultureItem.title && newCultureItem.description && newCultureItem.image) {
      setFormData(prev => ({
        ...prev,
        culture: [...prev.culture, newCultureItem]
      }));
      setNewCultureItem({ title: '', description: '', image: '' });
    }
  };

  const removeCultureItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      culture: prev.culture.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Edit Company Profile</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <input
                  type="text"
                  required
                  value={formData.industry}
                  onChange={e => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company Size</label>
                <input
                  type="text"
                  required
                  value={formData.size}
                  onChange={e => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 100-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Founded Year</label>
                <input
                  type="number"
                  required
                  value={formData.founded}
                  onChange={e => setFormData(prev => ({ ...prev, founded: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  required
                  value={formData.website}
                  onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Description</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Benefits */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Benefits & Perks</label>
                <button
                  type="button"
                  onClick={addBenefit}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Benefit
                </button>
              </div>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={e => updateBenefit(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Culture */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Company Culture</label>
              </div>
              
              {/* Existing Culture Items */}
              <div className="space-y-4 mb-4">
                {formData.culture.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <button
                        type="button"
                        onClick={() => removeCultureItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <img src={item.image} alt={item.title} className="h-32 w-full object-cover rounded" />
                  </div>
                ))}
              </div>

              {/* Add New Culture Item */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-4">Add New Culture Item</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newCultureItem.title}
                    onChange={e => setNewCultureItem(prev => ({ ...prev, title: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={newCultureItem.description}
                    onChange={e => setNewCultureItem(prev => ({ ...prev, description: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newCultureItem.image}
                    onChange={e => setNewCultureItem(prev => ({ ...prev, image: e.target.value }))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addCultureItem}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Culture Item
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Social Media Links</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm text-gray-600">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.linkedin || ''}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Twitter</label>
                  <input
                    type="url"
                    value={formData.socialMedia?.twitter || ''}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}