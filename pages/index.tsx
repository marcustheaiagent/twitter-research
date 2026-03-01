import { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingUp, Zap, MessageCircle, Share2, Heart, Lightbulb } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Tweet {
  id: string
  text: string
  author: string
  likes: number
  retweets: number
  replies: number
  engagement_rate: number
  category: string
  created_at: string
}

interface ContentIdea {
  title: string
  format: string
  topic: string
  hooks: string[]
  engagement_potential: number
  reasoning: string
}

interface ResearchData {
  top_tweets: Tweet[]
  trending_topics: { [key: string]: number }
  content_ideas: ContentIdea[]
  engagement_trends: Array<{ date: string; avg_engagement: number }>
  insights: string[]
}

export default function TwitterResearch() {
  const [data, setData] = useState<ResearchData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResearch()
  }, [])

  const fetchResearch = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/twitter-research')
      setData(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch research')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>🔍 Analyzing Twitter...</div>
          <div style={{ color: '#94a3b8' }}>Fetching trends and engagement patterns</div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ef4444' }}>⚠️ Error</div>
          <div style={{ color: '#94a3b8' }}>{error || 'Unable to load research data'}</div>
          <button 
            onClick={fetchResearch}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🐦 Twitter Research Dashboard
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>
            What's working in tech/AI/crypto right now
          </p>
        </div>

        {/* Content Ideas */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Lightbulb size={28} style={{ color: '#fbbf24' }} />
            Content Ideas for bot join.ai
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {data.content_ideas.slice(0, 6).map((idea, idx) => (
              <div key={idx} style={{ background: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {idea.title}
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                      Format: <strong>{idea.format}</strong>
                    </div>
                  </div>
                  <div style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                  }}>
                    {(idea.engagement_potential * 100).toFixed(0)}% potential
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#cbd5e1', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Hooks:
                  </div>
                  <ul style={{ fontSize: '0.875rem', color: '#94a3b8', marginLeft: '1.5rem', lineHeight: '1.6' }}>
                    {idea.hooks.map((hook, i) => (
                      <li key={i}>{hook}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '0.375rem', fontSize: '0.875rem', color: '#cbd5e1', borderLeft: '3px solid #3b82f6' }}>
                  <strong>Why:</strong> {idea.reasoning}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tweets */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <TrendingUp size={28} /> Top Performing Tweets
          </h2>

          <div>
            {data.top_tweets.slice(0, 8).map((tweet) => (
              <div key={tweet.id} style={{ background: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>@{tweet.author}</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{tweet.category}</div>
                  </div>
                  <div style={{
                    background: tweet.engagement_rate > 0.05 ? '#10b981' : '#f59e0b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}>
                    {(tweet.engagement_rate * 100).toFixed(1)}% engagement
                  </div>
                </div>

                <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: '#e2e8f0' }}>
                  {tweet.text.substring(0, 200)}...
                </p>

                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', color: '#94a3b8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={16} /> {tweet.likes.toLocaleString()} likes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Share2 size={16} /> {tweet.retweets.toLocaleString()} retweets
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageCircle size={16} /> {tweet.replies.toLocaleString()} replies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={28} style={{ color: '#fbbf24' }} />
            Key Insights
          </h2>

          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {data.insights.map((insight, idx) => (
              <li key={idx} style={{
                background: '#0f172a',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                lineHeight: '1.6',
              }}>
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p>Data sourced from Twitter API • Analysis updated hourly</p>
        </div>
      </div>
    </div>
  )
}
