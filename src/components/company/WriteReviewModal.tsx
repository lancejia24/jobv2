import React, { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ReviewFormData {
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  position: string;
  categories: {
    interview: number;
    benefits: number;
    culture: number;
    growth: number;
    response: number;
  };
}

interface WriteReviewModalProps {
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

export function WriteReviewModal({ onClose, onSubmit }: WriteReviewModalProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    content: '',
    pros: [''],
    cons: [''],
    position: '',
    categories: {
      interview: 0,
      benefits: 0,
      culture: 0,
      growth: 0,
      response: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addField = (field: 'pros' | 'cons') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'pros' | 'cons', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'pros' | 'cons', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const renderStarRating = (name: string, value: number, onChange: (rating: number) => void) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`h-6 w-6 ${
              star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Write a Review</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            {renderStarRating(
              'rating',
              formData.rating,
              (rating) => setFormData(prev => ({ ...prev, rating }))
            )}
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Summarize your experience"
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your experience working here..."
            />
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pros
              </label>
              {formData.pros.map((pro, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => updateField('pros', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add a pro"
                  />
                  <button
                    type="button"
                    onClick={() => removeField('pros', index)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('pros')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add another pro
              </button>
            </div>

            {/* Cons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cons
              </label>
              {formData.cons.map((con, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => updateField('cons', index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Add a con"
                  />
                  <button
                    type="button"
                    onClick={() => removeField('cons', index)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('cons')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add another con
              </button>
            </div>
          </div>

          {/* Category Ratings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-4">Category Ratings</h3>
            <div className="space-y-4">
              {Object.entries(formData.categories).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 capitalize">
                    {category.replace('_', ' ')}
                  </span>
                  {renderStarRating(
                    category,
                    rating,
                    (newRating) => setFormData(prev => ({
                      ...prev,
                      categories: {
                        ...prev.categories,
                        [category]: newRating
                      }
                    }))
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Position
            </label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}