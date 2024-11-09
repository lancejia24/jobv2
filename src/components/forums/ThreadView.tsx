import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Flag, MoreHorizontal, File, Image as ImageIcon } from 'lucide-react';
import { type ForumThread, type ForumPost } from '../../types';

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: '1',
    threadId: '1',
    content: `I recently went through salary negotiations for my first tech job, and I wanted to share some tips that helped me:

1. Research the market rate for your position
2. Prepare specific examples of your achievements
3. Consider the entire compensation package
4. Practice your negotiation pitch
5. Be confident but professional

Would love to hear others' experiences and additional tips!`,
    authorId: '1',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    createdAt: new Date('2024-03-10'),
    likes: 24,
  },
  {
    id: '2',
    threadId: '1',
    content: 'Great tips! I would add that it\'s also important to get the offer in writing and take time to review all the details before accepting.',
    authorId: '2',
    authorName: 'Michael Rodriguez',
    createdAt: new Date('2024-03-10'),
    likes: 12,
  }
];

interface ThreadViewProps {
  thread: ForumThread;
}

export function ThreadView({ thread }: ThreadViewProps) {
  const [replyContent, setReplyContent] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleReply = () => {
    // Handle reply submission
    console.log('Reply:', replyContent);
    setReplyContent('');
    setAttachments([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Thread Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{thread.title}</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Flag className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{thread.views} views</span>
            <span>•</span>
            <span>{thread.replies} replies</span>
            <span>•</span>
            <span>Started {new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {SAMPLE_POSTS.map((post, index) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    {post.authorAvatar ? (
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="h-12 w-12 rounded-full"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-medium text-gray-600">
                          {post.authorName[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {post.authorName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleString()}
                          {post.isEdited && ' (edited)'}
                        </p>
                      </div>
                      {index === 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Original Post
                        </span>
                      )}
                    </div>
                    <div className="mt-4 prose max-w-none text-gray-900">
                      <p className="whitespace-pre-line">{post.content}</p>
                    </div>
                    {post.attachments && post.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {post.attachments.map((attachment, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-2 text-sm"
                          >
                            {attachment.type.startsWith('image/') ? (
                              <ImageIcon className="h-4 w-4 text-gray-400" />
                            ) : (
                              <File className="h-4 w-4 text-gray-400" />
                            )}
                            <a
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              {attachment.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center space-x-4">
                      <button className="flex items-center text-gray-400 hover:text-gray-500">
                        <ThumbsUp className="h-5 w-5 mr-1" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-400 hover:text-gray-500">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Box */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Post a Reply</h3>
          <div className="space-y-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Write your reply..."
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer text-gray-500 hover:text-gray-700">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex items-center space-x-1">
                    <File className="h-5 w-5" />
                    <span className="text-sm">Attach files</span>
                  </div>
                </label>
                {attachments.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {attachments.length} file(s) selected
                  </span>
                )}
              </div>
              <button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}