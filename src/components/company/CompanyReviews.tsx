import React, { useState } from 'react';
import { Star, ThumbsUp, Clock, Users, Building, TrendingUp, MessageSquare } from 'lucide-react';
import { WriteReviewModal } from './WriteReviewModal';

interface CompanyReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  categories: {
    interview: number;
    benefits: number;
    culture: number;
    growth: number;
    response: number;
  };
  date: Date;
  helpful: number;
  position: string;
  isVerified: boolean;
}

interface CompanyMetrics {
  overallRating: number;
  totalReviews: number;
  responseTime: string;
  employeeSatisfaction: number;
  benefitsRating: number;
  categories: {
    interview: number;
    benefits: number;
    culture: number;
    growth: number;
    response: number;
  };
}

const SAMPLE_REVIEWS: CompanyReview[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John D.',
    rating: 4,
    title: 'Great first job experience',
    content: 'Excellent environment for recent graduates. Good mentorship program.',
    pros: ['Great mentorship', 'Work-life balance', 'Learning opportunities'],
    cons: ['Initial salary could be better', 'Limited remote work options'],
    categories: {
      interview: 4,
      benefits: 3,
      culture: 5,
      growth: 4,
      response: 4
    },
    date: new Date('2024-03-01'),
    helpful: 15,
    position: 'Junior Developer',
    isVerified: true
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Excellent career growth opportunities',
    content: 'The company really invests in entry-level talent development.',
    pros: ['Career growth', 'Training programs', 'Supportive team'],
    cons: ['Complex processes', 'Large organization challenges'],
    categories: {
      interview: 5,
      benefits: 4,
      culture: 4,
      growth: 5,
      response: 3
    },
    date: new Date('2024-02-15'),
    helpful: 23,
    position: 'Associate Product Manager',
    isVerified: true
  }
];

const COMPANY_METRICS: CompanyMetrics = {
  overallRating: 4.2,
  totalReviews: 156,
  responseTime: '2 days',
  employeeSatisfaction: 85,
  benefitsRating: 4.0,
  categories: {
    interview: 4.2,
    benefits: 4.0,
    culture: 4.5,
    growth: 4.3,
    response: 3.8
  }
};

export function CompanyReviews() {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const sortedReviews = [...SAMPLE_REVIEWS].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.date.getTime() - a.date.getTime();
    }
    return b.helpful - a.helpful;
  }).filter(review => !filterRating || review.rating === filterRating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Metrics Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              {renderStars(Math.round(COMPANY_METRICS.overallRating))}
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {COMPANY_METRICS.overallRating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">Overall Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {COMPANY_METRICS.totalReviews}
            </p>
            <p className="text-sm text-gray-500">Total Reviews</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {COMPANY_METRICS.responseTime}
            </p>
            <p className="text-sm text-gray-500">Avg. Response Time</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {COMPANY_METRICS.employeeSatisfaction}%
            </p>
            <p className="text-sm text-gray-500">Employee Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Building className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {COMPANY_METRICS.benefitsRating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">Benefits Rating</p>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(COMPANY_METRICS.categories).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 capitalize">
                {category.replace('_', ' ')}
              </span>
              <div className="flex items-center">
                <div className="flex mr-2">
                  {renderStars(Math.round(rating))}
                </div>
                <span className="text-sm text-gray-900">{rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
          </select>
          <select
            value={filterRating || ''}
            onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        <button
          onClick={() => setShowWriteReview(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  {review.isVerified && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified Employee
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">{review.title}</h3>
              </div>
              <p className="text-sm text-gray-500">
                {review.date.toLocaleDateString()}
              </p>
            </div>

            <p className="mt-2 text-sm text-gray-600">{review.content}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Pros</h4>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {review.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Cons</h4>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {review.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-500">{review.position}</p>
                <span className="text-gray-300">•</span>
                <p className="text-sm text-gray-500">{review.userName}</p>
              </div>
              <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      {showWriteReview && (
        <WriteReviewModal
          onClose={() => setShowWriteReview(false)}
          onSubmit={(reviewData) => {
            console.log('Review submitted:', reviewData);
            setShowWriteReview(false);
          }}
        />
      )}
    </div>
  );
}