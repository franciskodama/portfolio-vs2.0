import React, { useState } from 'react';

const CareerAlchemist = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [isBrewing, setIsBrewing] = useState(false);

  const brewPotion = async () => {
    if (!input.trim()) return;
    
    setIsBrewing(true);
    setResult(null);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error('Failed to brew potion');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Magic failure:', error);
      // Fallback or error state could be handled here
    } finally {
      setIsBrewing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-900 text-white rounded-3xl border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
      <h2 className="text-2xl font-bold mb-6 text-purple-300">The Career Alchemist</h2>
      
      {/* The Crystal Ball Visual */}
      <div className={`relative w-64 h-64 rounded-full border-4 border-purple-400/50 flex items-center justify-center overflow-hidden transition-all duration-700 ${isBrewing ? 'animate-pulse shadow-[0_0_100px_rgba(168,85,247,0.6)]' : 'shadow-inner'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
        
        {isBrewing ? (
          <div className="text-center animate-bounce">🔮 <br/> Brewing...</div>
        ) : (
          <textarea 
            className="z-10 bg-transparent text-center p-4 w-full h-full outline-none resize-none placeholder-purple-300/50"
            placeholder="Paste a Job Description or Company Name here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}
      </div>

      {/* The Magic Hands (Abstracted) */}
      <div className="flex justify-between w-80 -mt-10 pointer-events-none">
        <span className="text-5xl animate-bounce">🖐️</span>
        <span className="text-5xl animate-bounce delay-100">🤚</span>
      </div>

      {!result && !isBrewing && (
        <button 
          onClick={brewPotion}
          className="mt-8 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all"
        >
          See My Future at Your Company
        </button>
      )}

      {/* The Result: The Potion */}
      {result && (
        <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md animate-in fade-in zoom-in">
          <h3 className="text-xl font-bold text-green-400">Match Found: {result.score}%</h3>
          <p className="italic mt-2">"The stars align. {result.prediction}"</p>
          <div className="mt-4 flex gap-2">
            {result.ingredients.map(ing => (
              <span key={ing} className="text-xs bg-purple-900 px-2 py-1 rounded-full border border-purple-400">✨ {ing}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerAlchemist;