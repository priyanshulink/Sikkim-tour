import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';
import { educationAPI } from '../services/api';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await educationAPI.getContent({ type: 'quiz' });
      setQuestions(response.data.content);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    // Track answer
    const isCorrect = answerIndex === currentQuestion?.correctAnswer;
    if (!answeredQuestions.includes(currentIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentIndex]);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    // Check if quiz is complete
    if (currentIndex + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions([]);
    setScore(0);
    setShowResults(false);
  };

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  return (
    <>
      <Navbar />
      <FloatingChatbot />
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        paddingTop: '80px',
        paddingBottom: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          fontSize: '5rem',
          opacity: '0.3',
          animation: 'float 6s ease-in-out infinite'
        }}>🏯</div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '4rem',
          opacity: '0.3',
          animation: 'float 8s ease-in-out infinite'
        }}>🕉️</div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          fontSize: '3rem',
          opacity: '0.3',
          animation: 'float 7s ease-in-out infinite'
        }}>🙏</div>
        
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Header */}
          <button
            onClick={() => navigate('/learn')}
            style={{
              background: 'white',
              border: '2px solid #667eea',
              color: '#667eea',
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
          >
            ← Back to Learn Home
          </button>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '3rem',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              🧠 Quiz Time
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666'
            }}>
              Test your knowledge and learn more about Sikkim!
            </p>
          </div>

          {showResults ? (
            /* Results Screen */
            <div style={{ position: 'relative' }}>
              {/* Sparkle Effects */}
              <style>{`
                @keyframes sparkle {
                  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                  50% { opacity: 1; transform: scale(1) rotate(180deg); }
                }
                @keyframes blast {
                  0% { transform: scale(0.5); opacity: 0; }
                  50% { transform: scale(1.2); opacity: 1; }
                  100% { transform: scale(1); opacity: 1; }
                }
                @keyframes confetti {
                  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .sparkle {
                  position: absolute;
                  animation: sparkle 1.5s ease-in-out infinite;
                  z-index: 100;
                  pointer-events: none;
                }
                .confetti {
                  position: absolute;
                  animation: confetti 3s linear infinite;
                  z-index: 100;
                  pointer-events: none;
                }
              `}</style>
              
              {/* Confetti Elements */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-20px`,
                    fontSize: '2rem',
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
                </div>
              ))}

              {/* Sparkles */}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="sparkle"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    fontSize: '1.5rem',
                    animationDelay: `${Math.random() * 1.5}s`
                  }}
                >
                  ✨
                </div>
              ))}

              <div style={{
                background: 'white',
                borderRadius: '30px',
                padding: '60px 40px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                animation: 'blast 0.6s ease-out',
                position: 'relative',
                zIndex: 10
              }}>
                <div style={{
                  fontSize: '5rem',
                  marginBottom: '30px',
                  animation: 'blast 0.8s ease-out'
                }}>
                  {score / questions.length >= 0.8 ? '🏆' : score / questions.length >= 0.5 ? '🎯' : '💪'}
                </div>

                <h2 style={{
                  fontSize: '3rem',
                  color: '#2c3e50',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>
                  Quiz Complete!
                </h2>

                <div style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '20px'
                }}>
                  {score} / {questions.length}
                </div>

                <p style={{
                  fontSize: '1.5rem',
                  color: '#666',
                  marginBottom: '10px'
                }}>
                  {score / questions.length >= 0.8 
                    ? '🌟 Excellent! You\'re a Sikkim expert!' 
                    : score / questions.length >= 0.5 
                    ? '👍 Good job! Keep learning!' 
                    : '📚 Nice try! Keep exploring Sikkim!'}
                </p>

                <p style={{
                  fontSize: '1.2rem',
                  color: '#999',
                  marginBottom: '40px'
                }}>
                  You scored {Math.round((score / questions.length) * 100)}%
                </p>

                <div style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={handleRestart}
                    style={{
                      padding: '18px 40px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: 'white',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    🔄 Try Again
                  </button>
                  
                  <button
                    onClick={() => navigate('/learn')}
                    style={{
                      padding: '18px 40px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#667eea',
                      background: 'white',
                      border: '3px solid #667eea',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#667eea';
                    }}
                  >
                    🏠 Back to Learning
                  </button>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⏳</div>
              <p style={{ fontSize: '1.2rem' }}>Loading quiz...</p>
            </div>
          ) : questions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 20px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
              <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>No Quiz Available</h2>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Check back later for new questions!
              </p>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '1.1rem',
                color: '#666',
                fontWeight: 'bold'
              }}>
                Question {currentIndex + 1} of {questions.length}
              </div>

              {/* Quiz Card */}
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                marginBottom: '30px'
              }}>
                {/* Category */}
                <div style={{
                  display: 'inline-block',
                  background: currentQuestion?.category?.color || '#667eea',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '25px'
                }}>
                  {currentQuestion?.category?.icon} {currentQuestion?.category?.name}
                </div>

                {/* Question */}
                <h2 style={{
                  fontSize: '2rem',
                  color: '#2c3e50',
                  marginBottom: '30px',
                  lineHeight: '1.5'
                }}>
                  {currentQuestion?.question || currentQuestion?.title}
                </h2>

                {/* Options */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {currentQuestion?.options?.map((option, index) => {
                    let backgroundColor = 'white';
                    let borderColor = '#ddd';
                    let color = '#2c3e50';

                    if (showExplanation) {
                      if (index === currentQuestion.correctAnswer) {
                        backgroundColor = '#d4edda';
                        borderColor = '#28a745';
                        color = '#155724';
                      } else if (index === selectedAnswer) {
                        backgroundColor = '#f8d7da';
                        borderColor = '#dc3545';
                        color = '#721c24';
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleAnswerClick(index)}
                        disabled={showExplanation}
                        style={{
                          padding: '20px',
                          fontSize: '1.1rem',
                          textAlign: 'left',
                          border: `3px solid ${borderColor}`,
                          borderRadius: '15px',
                          background: backgroundColor,
                          color: color,
                          cursor: showExplanation ? 'default' : 'pointer',
                          transition: 'all 0.3s',
                          fontWeight: '500'
                        }}
                      >
                        <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showExplanation && (
                  <div style={{
                    marginTop: '30px',
                    padding: '25px',
                    background: isCorrect ? '#d4edda' : '#fff3cd',
                    borderRadius: '15px',
                    border: `3px solid ${isCorrect ? '#28a745' : '#ffc107'}`
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: isCorrect ? '#155724' : '#856404',
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      {isCorrect ? '✅ Correct!' : '❌ Not quite!'}
                    </h3>
                    <p style={{
                      fontSize: '1.1rem',
                      color: '#555',
                      lineHeight: '1.7'
                    }}>
                      {currentQuestion?.explanation || currentQuestion?.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Next Button */}
              {showExplanation && (
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleNext}
                    style={{
                      padding: '15px 50px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: 'white',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Next Question →
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Quiz;
