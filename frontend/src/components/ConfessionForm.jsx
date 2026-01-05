import React, { useState } from 'react';
import { confessionAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FiSend, FiAlertCircle } from 'react-icons/fi';
import '../styles/App.css';

const ConfessionForm = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const categories = [
    'General',
    'Love',
    'College',
    'Career',
    'Family',
    'Mental Health',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Please write something before confessing');
      return;
    }

    if (text.length > 500) {
      toast.error('Confession must be less than 500 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await confessionAPI.create(text, category);
      setText('');
      setCharCount(0);
      toast.success('Confession posted anonymously!', {
        icon: '🎭',
        duration: 3000,
      });
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to post confession';
      if (errorMsg.includes('inappropriate')) {
        toast.error('Your confession contains inappropriate content', {
          icon: '⚠️',
        });
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  return (
    <div className="confession-form">
      <div className="form-header">
        <h2>Confess Anonymously</h2>
        <p>Get it off your chest. No one will know it's you.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="confession">Your Confession</label>
          <textarea
            id="confession"
            value={text}
            onChange={handleTextChange}
            placeholder="Type your confession here..."
            maxLength={500}
            rows={4}
            className="confession-textarea"
          />
          <div className="char-counter">
            {charCount}/500 characters
          </div>
        </div>

        <div className="form-footer">
          <div className="disclaimer">
            <FiAlertCircle />
            <small>
              All confessions are anonymous. Inappropriate content will be filtered automatically.
            </small>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="submit-btn"
          >
            {isSubmitting ? (
              'Posting...'
            ) : (
              <>
                <FiSend /> Post Confession
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfessionForm;