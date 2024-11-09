import React from 'react';
import { BarChart as BarChartIcon, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

export function AnalyticsDashboard() {
  const metrics = {
    applicationsPerJob: 45,
    averageTimeToHire: 18,
    offerAcceptanceRate: 85,
    topSourcesOfHire: [
      { source: 'Direct Applications', percentage: 45 },
      { source: 'Employee Referrals', percentage: 30 },
      { source: 'LinkedIn', percentage: 15 },
      { source: 'Job Boards', percentage: 10 },
    ],
    hiringFunnel: [
      { stage: 'Applications', count: 1000 },
      { stage: 'Screened', count: 500 },
      { stage: 'Interviewed', count: 200 },
      { stage: 'Offers Made', count: 50 },
      { stage: 'Hired', count: 40 },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Applications per Job</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.applicationsPerJob}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Time to Hire</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.averageTimeToHire} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Offer Acceptance Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{metrics.offerAcceptanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Funnel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Hiring Funnel</h2>
        <div className="space-y-4">
          {metrics.hiringFunnel.map((stage) => (
            <div key={stage.stage}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{stage.stage}</span>
                <span className="text-gray-900 font-medium">{stage.count}</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(stage.count / metrics.hiringFunnel[0].count) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources of Hire */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Sources of Hire</h2>
        <div className="space-y-4">
          {metrics.topSourcesOfHire.map((source) => (
            <div key={source.source}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{source.source}</span>
                <span className="text-gray-900 font-medium">{source.percentage}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Applications Trend</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChartIcon className="h-8 w-8" />
            <span className="ml-2">Chart visualization would go here</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Time to Hire Trend</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <TrendingUp className="h-8 w-8" />
            <span className="ml-2">Chart visualization would go here</span>
          </div>
        </div>
      </div>
    </div>
  );
}